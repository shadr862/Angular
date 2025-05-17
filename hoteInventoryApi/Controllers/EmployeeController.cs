using hoteInventoryApi.Model;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using static hoteInventoryApi.Model.EmployeeDetailsDto;

namespace hoteInventoryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        [HttpPost]
        public IActionResult PostEmployee([FromBody] Employee employee)
        {
            string _connectionString = "Server=DESKTOP-JBRE4TR; Database=HotelInventory; Trusted_Connection=True;";

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    try
                    {
                        // 1. Insert Employee
                        string insertEmpQuery = @"
                        INSERT INTO Employee (Name, Email, Phone, JoiningDate, Allow, Religion)
                        VALUES (@Name, @Email, @Phone, @JoiningDate, @Allow, @Religion);
                        SELECT SCOPE_IDENTITY();";

                        SqlCommand cmdEmp = new SqlCommand(insertEmpQuery, conn, transaction);
                        cmdEmp.Parameters.AddWithValue("@Name", employee.Name);
                        cmdEmp.Parameters.AddWithValue("@Email", employee.Email);
                        cmdEmp.Parameters.AddWithValue("@Phone", employee.Phone);
                        cmdEmp.Parameters.AddWithValue("@JoiningDate", employee.JoiningDate);
                        cmdEmp.Parameters.AddWithValue("@Allow", employee.Allow);
                        cmdEmp.Parameters.AddWithValue("@Religion", string.IsNullOrEmpty(employee.Religion) ? (object)DBNull.Value : employee.Religion);


                        int employeeId = Convert.ToInt32(cmdEmp.ExecuteScalar());

                        // 2. Insert Address
                        string insertAddrQuery = @"
                        INSERT INTO AddressE (EmployeeId, AddressLine, City, Country)
                        VALUES (@EmployeeId, @AddressLine, @City, @Country);";

                        SqlCommand cmdAddr = new SqlCommand(insertAddrQuery, conn, transaction);
                        cmdAddr.Parameters.AddWithValue("@EmployeeId", employeeId);
                        cmdAddr.Parameters.AddWithValue("@AddressLine", employee.AddressE.AddressLine);
                        cmdAddr.Parameters.AddWithValue("@City", employee.AddressE.City);
                        cmdAddr.Parameters.AddWithValue("@Country", employee.AddressE.Country);
                        cmdAddr.ExecuteNonQuery();

                        // 3. Insert RelationalStatusForm
                        foreach (var rel in employee.RelationalStatusForm)
                        {
                            string insertRelQuery = @"
                            INSERT INTO RelationalStatusForm (EmployeeId, Name, Status)
                            VALUES (@EmployeeId, @Name, @Status);";

                            SqlCommand cmdRel = new SqlCommand(insertRelQuery, conn, transaction);
                            cmdRel.Parameters.AddWithValue("@EmployeeId", employeeId);
                            cmdRel.Parameters.AddWithValue("@Name", rel.Name);
                            cmdRel.Parameters.AddWithValue("@Status", rel.Status);
                            cmdRel.ExecuteNonQuery();
                        }

                        transaction.Commit();

                        return Ok(new { Message = "Employee inserted successfully!", EmployeeId = employeeId });
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return StatusCode(500, "Transaction Failed: " + ex.Message);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Database Connection Failed: " + ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetEmployeeDetails()
        {
            List<EmployeeDetailsGet> employees = new List<EmployeeDetailsGet>();
            Dictionary<int, EmployeeDetailsGet> employeeMap = new Dictionary<int, EmployeeDetailsGet>();

            using (SqlConnection con = new SqlConnection("Server=DESKTOP-JBRE4TR; Database=HotelInventory; Trusted_Connection=True;"))
            {
                SqlCommand cmd = new SqlCommand("GetEmployeeDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    int employeeId = Convert.ToInt32(reader["EmployeeId"]);

                    if (!employeeMap.ContainsKey(employeeId))
                    {
                        var employee = new EmployeeDetailsGet
                        {
                            EmployeeId = employeeId,
                            Name = reader["Name"].ToString(),
                            Email = reader["Email"].ToString(),
                            Phone = reader["Phone"].ToString(),
                            JoiningDate = reader["JoiningDate"] as DateTime?,
                            Allow = Convert.ToBoolean(reader["Allow"]),
                            Religion = reader["Religion"] == DBNull.Value ? null : reader["Religion"].ToString(),

                            Address = new AddressGet
                            {
                                AddressId = Convert.ToInt32(reader["AddressId"]),
                                AddressLine = reader["AddressLine"].ToString(),
                                City = reader["City"].ToString(),
                                Country = reader["Country"].ToString()
                            },

                            RelationalStatusList = new List<RelationalStatusGet>()
                        };

                        employeeMap[employeeId] = employee;
                    }

                    // Add relational status info only if not null
                    if (reader["RelationalStatusId"] != DBNull.Value)
                    {
                        employeeMap[employeeId].RelationalStatusList.Add(new RelationalStatusGet
                        {
                            RelationalStatusId = Convert.ToInt32(reader["RelationalStatusId"]),
                            Name = reader["RelationalName"].ToString(),
                            Status = reader["RelationalStatus"].ToString()
                        });
                    }
                }

                reader.Close();
            }

            employees = employeeMap.Values.ToList();
            return Ok(employees);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection("Server=DESKTOP-JBRE4TR; Database=HotelInventory; Trusted_Connection=True;"))
                {
                    con.Open();

                    // Delete relational statuses for the employee
                    SqlCommand deleteRelStatuses = new SqlCommand("DELETE FROM RelationalStatusForm WHERE EmployeeId = @EmployeeId", con);
                    deleteRelStatuses.Parameters.AddWithValue("@EmployeeId", id);
                    deleteRelStatuses.ExecuteNonQuery();

                    // Delete address for the employee
                    SqlCommand deleteAddress = new SqlCommand("DELETE FROM AddressE WHERE EmployeeId = @EmployeeId", con);
                    deleteAddress.Parameters.AddWithValue("@EmployeeId", id);
                    deleteAddress.ExecuteNonQuery();

                    // Delete employee record
                    SqlCommand deleteEmployee = new SqlCommand("DELETE FROM Employee WHERE Id = @EmployeeId", con);
                    deleteEmployee.Parameters.AddWithValue("@EmployeeId", id);
                    int rowsAffected = deleteEmployee.ExecuteNonQuery();

                    if (rowsAffected > 0)
                        return Ok(new { message = "Employee deleted successfully." });
                    else
                        return NotFound(new { message = "Employee ID not found." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting employee", error = ex.Message });
            }
        }


        [HttpPut("{id}")]
        public IActionResult EditEmployee(int id, [FromBody] Employee employee)
        {
            string _connectionString = "Server=DESKTOP-JBRE4TR; Database=HotelInventory; Trusted_Connection=True;";

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    SqlTransaction transaction = conn.BeginTransaction();

                    try
                    {
                        // 1. Update Employee
                        string updateEmpQuery = @"
                UPDATE Employee 
                SET Name = @Name, Email = @Email, Phone = @Phone, 
                    JoiningDate = @JoiningDate, Allow = @Allow, Religion = @Religion
                WHERE Id = @EmployeeId;";

                        SqlCommand cmdEmp = new SqlCommand(updateEmpQuery, conn, transaction);
                        cmdEmp.Parameters.AddWithValue("@EmployeeId", id);
                        cmdEmp.Parameters.AddWithValue("@Name", employee.Name);
                        cmdEmp.Parameters.AddWithValue("@Email", employee.Email);
                        cmdEmp.Parameters.AddWithValue("@Phone", employee.Phone);
                        cmdEmp.Parameters.AddWithValue("@JoiningDate", employee.JoiningDate);
                        cmdEmp.Parameters.AddWithValue("@Allow", employee.Allow);
                        cmdEmp.Parameters.AddWithValue("@Religion", string.IsNullOrEmpty(employee.Religion) ? (object)DBNull.Value : employee.Religion);
                        cmdEmp.ExecuteNonQuery();

                        // 2. Update Address (or insert if not exists)
                        string checkAddressQuery = "SELECT COUNT(*) FROM AddressE WHERE EmployeeId = @EmployeeId";
                        SqlCommand checkAddrCmd = new SqlCommand(checkAddressQuery, conn, transaction);
                        checkAddrCmd.Parameters.AddWithValue("@EmployeeId", id);
                        int addrExists = (int)checkAddrCmd.ExecuteScalar();

                        if (addrExists > 0)
                        {
                            string updateAddrQuery = @"
                    UPDATE AddressE 
                    SET AddressLine = @AddressLine, City = @City, Country = @Country 
                    WHERE EmployeeId = @EmployeeId;";
                            SqlCommand cmdAddr = new SqlCommand(updateAddrQuery, conn, transaction);
                            cmdAddr.Parameters.AddWithValue("@EmployeeId", id);
                            cmdAddr.Parameters.AddWithValue("@AddressLine", employee.AddressE.AddressLine);
                            cmdAddr.Parameters.AddWithValue("@City", employee.AddressE.City);
                            cmdAddr.Parameters.AddWithValue("@Country", employee.AddressE.Country);
                            cmdAddr.ExecuteNonQuery();
                        }
                        else
                        {
                            string insertAddrQuery = @"
                    INSERT INTO AddressE (EmployeeId, AddressLine, City, Country)
                    VALUES (@EmployeeId, @AddressLine, @City, @Country);";
                            SqlCommand cmdAddr = new SqlCommand(insertAddrQuery, conn, transaction);
                            cmdAddr.Parameters.AddWithValue("@EmployeeId", id);
                            cmdAddr.Parameters.AddWithValue("@AddressLine", employee.AddressE.AddressLine);
                            cmdAddr.Parameters.AddWithValue("@City", employee.AddressE.City);
                            cmdAddr.Parameters.AddWithValue("@Country", employee.AddressE.Country);
                            cmdAddr.ExecuteNonQuery();
                        }

                        // 3. Delete existing relational statuses first
                        SqlCommand delRelCmd = new SqlCommand("DELETE FROM RelationalStatusForm WHERE EmployeeId = @EmployeeId", conn, transaction);
                        delRelCmd.Parameters.AddWithValue("@EmployeeId", id);
                        delRelCmd.ExecuteNonQuery();

                        // 4. Insert updated relational statuses
                        foreach (var rel in employee.RelationalStatusForm)
                        {
                            string insertRelQuery = @"
                    INSERT INTO RelationalStatusForm (EmployeeId, Name, Status)
                    VALUES (@EmployeeId, @Name, @Status);";
                            SqlCommand cmdRel = new SqlCommand(insertRelQuery, conn, transaction);
                            cmdRel.Parameters.AddWithValue("@EmployeeId", id);
                            cmdRel.Parameters.AddWithValue("@Name", rel.Name);
                            cmdRel.Parameters.AddWithValue("@Status", rel.Status);
                            cmdRel.ExecuteNonQuery();
                        }

                        transaction.Commit();
                        return Ok(new { Message = "Employee updated successfully!", EmployeeId = id });
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return StatusCode(500, "Transaction Failed: " + ex.Message);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Database Connection Failed: " + ex.Message);
            }
        }




    }
}

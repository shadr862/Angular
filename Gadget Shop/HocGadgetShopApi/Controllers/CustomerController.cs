using HocGadgetShopApi.Model;
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HocGadgetShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        [HttpPost]
        public ActionResult SavaCustomerDetails(CustomerDetails requestDto)
        {
            SqlConnection sqlConnection = new SqlConnection
            {
                ConnectionString = "Server=DESKTOP-JBRE4TR; Database=gadgetShop; Trusted_Connection=True;"
            };
            sqlConnection.Open();

            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlConnection;
            cmd.CommandText = "Sp_SavaCustomerDetails";
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@CustomerId", requestDto.CustomerId);
            cmd.Parameters.AddWithValue("@FristName", requestDto.FristName);
            cmd.Parameters.AddWithValue("@LastName", requestDto.LastName);
            cmd.Parameters.AddWithValue("@Email", requestDto.Email);
            cmd.Parameters.AddWithValue("@Phone", requestDto.Phone);
            cmd.Parameters.AddWithValue("@RegistrationDate", requestDto.RegistrationDate);
            cmd.ExecuteNonQuery();


            cmd.Dispose();
            sqlConnection.Close();

            return Ok();
        }
        [HttpGet]

        public ActionResult<List<InventoryDto>> GetCustomerData()
        {
            SqlConnection sqlConnection = new SqlConnection
            {
                ConnectionString = "Server=DESKTOP-JBRE4TR; Database=gadgetShop; Trusted_Connection=True;"
            };
            sqlConnection.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlConnection;
            cmd.CommandText = "Sp_GetCustomerData";
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<CustomerDetails> customerList = new List<CustomerDetails>();
            foreach (DataRow row in dt.Rows)
            {
                CustomerDetails customer = new CustomerDetails()
                {
                    CustomerId = Convert.ToInt32(row["CustomerId"]),
                    FristName = row["FristName"].ToString(),
                    LastName = row["LastName"].ToString(),
                    Email = row["Email"].ToString(),
                    Phone = row["Phone"].ToString(),
                    RegistrationDate = (row["RegistrationDate"]).ToString()
                };
                customerList.Add(customer);
            }
            cmd.Dispose();
            sqlConnection.Close();
            return Ok(customerList);
        }

        [HttpDelete]
        public ActionResult DeleteCustomerData(int CustomerId)
        {
            SqlConnection sqlConnection = new SqlConnection
            {
                ConnectionString = "Server=DESKTOP-JBRE4TR; Database=gadgetShop; Trusted_Connection=True;"
            };
            sqlConnection.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlConnection;
            cmd.CommandText = "Sp_DeleteCustomerData";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 0;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@CustomerId", CustomerId);
            cmd.ExecuteNonQuery();


            cmd.Dispose();
            sqlConnection.Close();
            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateInventoryData(CustomerDetails requestDto)
        {
            SqlConnection sqlConnection = new SqlConnection
            {
                ConnectionString = "Server=DESKTOP-JBRE4TR; Database=gadgetShop; Trusted_Connection=True;"
            };
            sqlConnection.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlConnection;
            cmd.CommandText = "Sp_UpdateCustomerData";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 0;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@CustomerId", requestDto.CustomerId);
            cmd.Parameters.AddWithValue("@FristName", requestDto.FristName);
            cmd.Parameters.AddWithValue("@LastName", requestDto.LastName);
            cmd.Parameters.AddWithValue("@Email", requestDto.Email);
            cmd.Parameters.AddWithValue("@Phone", requestDto.Phone);
            cmd.Parameters.AddWithValue("@RegistrationDate", requestDto.RegistrationDate);
            cmd.ExecuteNonQuery();


            cmd.Dispose();
            sqlConnection.Close();
            return Ok();
        }
    }
}

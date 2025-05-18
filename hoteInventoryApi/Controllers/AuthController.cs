using hoteInventoryApi.Model;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace hoteInventoryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] User user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest(new { message = "Invalid input" });
            }

            // Hash the password (simplified here - use secure hash like BCrypt)
            var hashedPassword = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(user.Password));

            string connectionString = "Server=DESKTOP-JBRE4TR; Database=HotelInventory; Trusted_Connection=True;";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = @"INSERT INTO Users (Username, Email, PasswordHash, Role) 
                         VALUES (@Username, @Email, @PasswordHash, @Role)";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Username", user.Username);
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@PasswordHash", hashedPassword);
                    cmd.Parameters.AddWithValue("@Role", user.Role);

                    conn.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();

                    if (rowsAffected > 0)
                        return Ok(new { message = "User registered successfully" });
                    else
                        return StatusCode(500, new { message = "User registration failed" });
                }
            }
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest(new { message = "Invalid login credentials" });
            }

            var hashedPassword = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(user.Password));

            string connectionString = "Server=DESKTOP-JBRE4TR; Database=HotelInventory; Trusted_Connection=True;";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = @"SELECT Username, Role FROM Users WHERE Email = @Email AND PasswordHash = @PasswordHash";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@PasswordHash", hashedPassword);

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            string username = reader.GetString(0);
                            string role = reader.GetString(1);

                            return Ok(new
                            {
                                message = "Login successful",
                                username = username,
                                email = user.Email,
                                role = role
                            });
                        }
                        else
                        {
                            return Unauthorized(new { message = "Invalid email or password" });
                        }
                    }
                }
            }
        }


    }
}

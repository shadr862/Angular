
using hoteInventoryApi.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;


namespace hoteInventoryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetRoomDetails()
        {
            SqlConnection sqlConnection = new SqlConnection
            {
                ConnectionString = "Server=DESKTOP-JBRE4TR; Database=HotelInventory; Trusted_Connection=True;"
            };
            sqlConnection.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlConnection;
            cmd.CommandText = "GetAllRoomDetails";
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader reader = cmd.ExecuteReader();
            List<roomDetails> roomDetails = new List<roomDetails>();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    roomDetails obj = new roomDetails();
                    obj.roomnumber = Convert.ToInt32(reader["roomnumber"]); // Fixed conversion issue  
                    obj.roomtype = reader["roomtype"].ToString();
                    obj.amenities = reader["amenities"].ToString();
                    obj.price = Convert.ToInt32(reader["price"]); // Fixed conversion issue  
                    obj.rating = Convert.ToDouble(reader["rating"]); // Fixed conversion issue  
                    obj.checkinTime = reader["checkinTime"].ToString();
                    obj.checkoutTime = reader["checkoutTime"].ToString();
                    roomDetails.Add(obj); // Added missing line to add the object to the list  
                }
            }

            cmd.Dispose();
            sqlConnection.Close();
            return Ok(roomDetails); // Return the populated list  
        }

        [HttpPost]
        public ActionResult SaveRoomsDetails(roomDetails room)
        {
            SqlConnection sqlConnection = new SqlConnection
            {
                ConnectionString = "Server=DESKTOP-JBRE4TR; Database=HotelInventory; Trusted_Connection=True;"
            };

            sqlConnection.Open();

            SqlCommand cmd = new SqlCommand
            {
                Connection = sqlConnection,
                CommandText = "SavaAllRoomDetails",
                CommandType = CommandType.StoredProcedure,
                CommandTimeout = 0
            };

            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@roomnumber", room.roomnumber);
            cmd.Parameters.AddWithValue("@roomtype", room.roomtype);
            cmd.Parameters.AddWithValue("@amenities", room.amenities);
            cmd.Parameters.AddWithValue("@price", room.price);
            cmd.Parameters.AddWithValue("@rating", room.rating);

            // Assuming room.checkinTime is string in ISO format
            DateTime checkin = DateTime.Parse(room.checkinTime, null, System.Globalization.DateTimeStyles.RoundtripKind);
            DateTime checkout = DateTime.Parse(room.checkoutTime, null, System.Globalization.DateTimeStyles.RoundtripKind);

            cmd.Parameters.AddWithValue("@checkinTime", checkin);
            cmd.Parameters.AddWithValue("@checkoutTime", checkout);

            int v = cmd.ExecuteNonQuery();

            cmd.Dispose();
            sqlConnection.Close();

            return Ok();
        }


        [HttpPut]

        public ActionResult UpdateRoomsDetails(roomDetails room)
        {
            SqlConnection sqlConnection = new SqlConnection
            {
                ConnectionString = "Server=DESKTOP-JBRE4TR; Database=HotelInventory; Trusted_Connection=True;"
            };

            sqlConnection.Open();

            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlConnection;
            cmd.CommandText = "UpdateAllRoomDetails";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 0;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@roomnumber", room.roomnumber);
            cmd.Parameters.AddWithValue("@roomtype", room.roomtype);
            cmd.Parameters.AddWithValue("@amenities", room.amenities);
            cmd.Parameters.AddWithValue("@price", room.price);
            cmd.Parameters.AddWithValue("@rating", room.rating);
            cmd.Parameters.AddWithValue("@checkinTime", DateTime.Parse(room.checkinTime));
            cmd.Parameters.AddWithValue("@checkoutTime", DateTime.Parse(room.checkoutTime));
            int v = cmd.ExecuteNonQuery();
            cmd.Dispose();
            sqlConnection.Close();

            return Ok();
        }

        [HttpDelete]

        public ActionResult DeleteRoomsDetails(int ID)
        {
            SqlConnection sqlConnection = new SqlConnection
            {
                ConnectionString = "Server=DESKTOP-JBRE4TR; Database=HotelInventory; Trusted_Connection=True;"
            };

            sqlConnection.Open();

            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlConnection;
            cmd.CommandText = "DeleteAllRoomDetails";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 0;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@roomnumber", ID);
            
            int v = cmd.ExecuteNonQuery();
            cmd.Dispose();
            sqlConnection.Close();

            return Ok();
        }
    }
}

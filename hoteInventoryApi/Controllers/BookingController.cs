using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using hoteInventoryApi.Model;
using System.Data.SqlClient;
using System.Data;

namespace hoteInventoryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {

        [HttpPost]
        public IActionResult SaveBookingDetails(BookingDetails booking)
        {
            using (SqlConnection conn = new SqlConnection("Server=DESKTOP-JBRE4TR; Database=HotelInventory; Trusted_Connection=True;"))
            {
                conn.Open();
                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    // 1. Insert into Bookings
                    SqlCommand cmdBooking = new SqlCommand(@"
                INSERT INTO Bookings 
                (RoomId, GuestName, GuestEmail, MobileNumber, CheckinDate, CheckoutDate, BookingStatus, BookingAmount, BookingDate, TnC, Passport)
                OUTPUT INSERTED.BookingID
                VALUES 
                (@RoomId, @GuestName, @GuestEmail, @MobileNumber, @CheckinDate, @CheckoutDate, @BookingStatus, @BookingAmount, @BookingDate, @TnC, @Passport)", conn, transaction);

                    cmdBooking.Parameters.AddWithValue("@RoomId", booking.roomId);
                    cmdBooking.Parameters.AddWithValue("@GuestName", booking.GuestName ?? "");
                    cmdBooking.Parameters.AddWithValue("@GuestEmail", booking.GuestEmail ?? "");
                    cmdBooking.Parameters.AddWithValue("@MobileNumber", booking.MobileNumber ?? "");
                    cmdBooking.Parameters.AddWithValue("@CheckinDate", booking.CheckinDate ?? (object)DBNull.Value);
                    cmdBooking.Parameters.AddWithValue("@CheckoutDate", booking.CheckoutDate ?? (object)DBNull.Value);
                    cmdBooking.Parameters.AddWithValue("@BookingStatus", booking.BookingStatus ?? "");
                    cmdBooking.Parameters.AddWithValue("@BookingAmount", booking.BookingAmount);
                    cmdBooking.Parameters.AddWithValue("@BookingDate", booking.BookingDate ?? (object)DBNull.Value);
                    cmdBooking.Parameters.AddWithValue("@TnC", booking.TnC);
                    cmdBooking.Parameters.AddWithValue("@Passport", string.IsNullOrEmpty(booking.Passport) ? (object)DBNull.Value : booking.Passport);

                    int bookingId = (int)cmdBooking.ExecuteScalar();

                    // 2. Insert into Addresses
                    SqlCommand cmdAddress = new SqlCommand(@"
                INSERT INTO Addresses (BookingID, AddressLine1, AddressLine2, City, State, Country, ZipCode)
                VALUES (@BookingID, @AddressLine1, @AddressLine2, @City, @State, @Country, @ZipCode)", conn, transaction);

                    cmdAddress.Parameters.AddWithValue("@BookingID", bookingId);
                    cmdAddress.Parameters.AddWithValue("@AddressLine1", booking.Address?.AddressLine1 ?? "");
                    cmdAddress.Parameters.AddWithValue("@AddressLine2", booking.Address?.AddressLine2 ?? "");
                    cmdAddress.Parameters.AddWithValue("@City", booking.Address?.City ?? "");
                    cmdAddress.Parameters.AddWithValue("@State", booking.Address?.State ?? "");
                    cmdAddress.Parameters.AddWithValue("@Country", booking.Address?.Country ?? "");
                    cmdAddress.Parameters.AddWithValue("@ZipCode", booking.Address?.ZipCode ?? "");

                    cmdAddress.ExecuteNonQuery();

                    // 3. Insert into GuestForms
                    if (booking.GuestForm != null)
                    {
                        foreach (var guest in booking.GuestForm)
                        {
                            SqlCommand cmdGuest = new SqlCommand(@"
                        INSERT INTO GuestForms (BookingID, GuestName, Age)
                        VALUES (@BookingID, @GuestName, @Age)", conn, transaction);

                            cmdGuest.Parameters.AddWithValue("@BookingID", bookingId);
                            cmdGuest.Parameters.AddWithValue("@GuestName", guest.GuestName ?? "");
                            cmdGuest.Parameters.AddWithValue("@Age", guest.Age);

                            cmdGuest.ExecuteNonQuery();
                        }
                    }

                    transaction.Commit();
                    return Ok(new { Message = "Booking saved successfully!", BookingID = bookingId });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return StatusCode(500, $"Error: {ex.Message}");
                }
            }
        }


        [HttpGet]
       
        public IActionResult GetBookingDetails()
        {
            List<BookingDetailsGet> bookings = new List<BookingDetailsGet>();
            Dictionary<int, BookingDetailsGet> bookingMap = new Dictionary<int, BookingDetailsGet>();

            using (SqlConnection con = new SqlConnection("Server=DESKTOP-JBRE4TR; Database=HotelInventory; Trusted_Connection=True;"))
            {
                SqlCommand cmd = new SqlCommand("GetBookingDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    int bookingId = Convert.ToInt32(reader["BookingID"]);

                    if (!bookingMap.ContainsKey(bookingId))
                    {
                        var booking = new BookingDetailsGet
                        {
                            BookingID = bookingId, // ✅ Added this line
                            roomId = Convert.ToInt32(reader["RoomId"]),
                            GuestName = reader["BookingGuestName"].ToString(),
                            GuestEmail = reader["GuestEmail"].ToString(),
                            MobileNumber = reader["MobileNumber"].ToString(),
                            CheckinDate = reader["CheckinDate"] as DateTime?,
                            CheckoutDate = reader["CheckoutDate"] as DateTime?,
                            BookingStatus = reader["BookingStatus"].ToString(),
                            BookingAmount = Convert.ToDecimal(reader["BookingAmount"]),
                            BookingDate = reader["BookingDate"] as DateTime?,
                            TnC = Convert.ToBoolean(reader["TnC"]),
                            Passport = reader["Passport"] == DBNull.Value ? null : reader["Passport"].ToString(),

                            Address = new Address
                            {
                                AddressLine1 = reader["AddressLine1"]?.ToString(),
                                AddressLine2 = reader["AddressLine2"]?.ToString(),
                                City = reader["City"]?.ToString(),
                                State = reader["State"]?.ToString(),
                                Country = reader["Country"]?.ToString(),
                                ZipCode = reader["ZipCode"]?.ToString()
                            },

                            GuestForm = new List<GuestForm>()
                        };

                        bookingMap[bookingId] = booking;
                    }

                    // Add guest form info only if not null
                    if (reader["GuestFormID"] != DBNull.Value)
                    {
                        bookingMap[bookingId].GuestForm.Add(new GuestForm
                        {
                            GuestName = reader["GuestFormGuestName"].ToString(),
                            Age = Convert.ToInt32(reader["Age"])
                        });
                    }
                }

                reader.Close();
            }

            bookings = bookingMap.Values.ToList();
            return Ok(bookings);
        }

        [HttpDelete]
        public IActionResult DeleteBooking(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection("Server=DESKTOP-JBRE4TR; Database=HotelInventory; Trusted_Connection=True;"))
                {
                    con.Open();

                    // Delete guest forms
                    SqlCommand deleteGuestForms = new SqlCommand("DELETE FROM GuestForms WHERE BookingID = @BookingID", con);
                    deleteGuestForms.Parameters.AddWithValue("@BookingID", id);
                    deleteGuestForms.ExecuteNonQuery();

                    // Delete address
                    SqlCommand deleteAddress = new SqlCommand("DELETE FROM Addresses WHERE BookingID = @BookingID", con);
                    deleteAddress.Parameters.AddWithValue("@BookingID", id);
                    deleteAddress.ExecuteNonQuery();

                    // Delete booking
                    SqlCommand deleteBooking = new SqlCommand("DELETE FROM Bookings WHERE BookingID = @BookingID", con);
                    deleteBooking.Parameters.AddWithValue("@BookingID", id);
                    int rowsAffected = deleteBooking.ExecuteNonQuery();

                    if (rowsAffected > 0)
                        return Ok(new { message = "Booking deleted successfully." });
                    else
                        return NotFound(new { message = "Booking ID not found." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting booking", error = ex.Message });
            }
        }




    }
}

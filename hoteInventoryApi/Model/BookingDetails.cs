using System.Net;

namespace hoteInventoryApi.Model
{
    public class BookingDetails
    {
        public int roomId { get; set; }
        public string GuestName { get; set; }
        public string GuestEmail { get; set; }
        public string MobileNumber { get; set; }
        public DateTime? CheckinDate { get; set; }
        public DateTime? CheckoutDate { get; set; }
        public string BookingStatus { get; set; }
        public decimal BookingAmount { get; set; }
        public DateTime? BookingDate { get; set; }
        public bool TnC { get; set; }

        public string? Passport { get; set; }  // ✅ Add this

        public Address Address { get; set; }
        public List<GuestForm> GuestForm { get; set; }
    }

    public class BookingDetailsGet
    {
        public int BookingID { get; set; }
        public int roomId { get; set; }
        public string GuestName { get; set; }
        public string GuestEmail { get; set; }
        public string MobileNumber { get; set; }
        public DateTime? CheckinDate { get; set; }
        public DateTime? CheckoutDate { get; set; }
        public string BookingStatus { get; set; }
        public decimal BookingAmount { get; set; }
        public DateTime? BookingDate { get; set; }
        public bool TnC { get; set; }

        public string? Passport { get; set; }  // ✅ Add this

        public Address Address { get; set; }
        public List<GuestForm> GuestForm { get; set; }
    }

    public class Address
    {
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
    }

    public class GuestForm
    {
        public string GuestName { get; set; }
        public int Age { get; set; }
    }





}

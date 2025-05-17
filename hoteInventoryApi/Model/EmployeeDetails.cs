namespace hoteInventoryApi.Model
{
    public class AddressE
    {
        public string AddressLine { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }

    public class RelationalStatusForm
    {
        public string Name { get; set; }
        public string Status { get; set; }
    }

    public class Employee
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime JoiningDate { get; set; }
        public AddressE AddressE { get; set; }
        public List<RelationalStatusForm> RelationalStatusForm { get; set; }
        public bool Allow { get; set; }
        public string? Religion { get; set; }
    }

}

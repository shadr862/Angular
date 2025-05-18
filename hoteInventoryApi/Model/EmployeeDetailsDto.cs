namespace hoteInventoryApi.Model
{
    public class EmployeeDetailsDto
    {
        public class EmployeeDetailsGet
        {
            public int EmployeeId { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }
            public DateTime? JoiningDate { get; set; }
            public string Role { get; set; }
            public bool Allow { get; set; }
            public string ?Religion { get; set; }

            public AddressGet Address { get; set; }

            public List<RelationalStatusGet> RelationalStatusList { get; set; }
        }

        public class AddressGet
        {
            public int AddressId { get; set; }
            public string AddressLine { get; set; }
            public string City { get; set; }
            public string Country { get; set; }
        }

        public class RelationalStatusGet
        {
            public int RelationalStatusId { get; set; }
            public string Name { get; set; }
            public string Status { get; set; }
        }


    }
}

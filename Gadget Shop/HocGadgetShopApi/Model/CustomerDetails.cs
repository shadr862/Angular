using System.Numerics;

namespace HocGadgetShopApi.Model
{
    public class CustomerDetails
    {
		public int CustomerId { get; set; }
        public string FristName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string  RegistrationDate { get; set; }
    }
}

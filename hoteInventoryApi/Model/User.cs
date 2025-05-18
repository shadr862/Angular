namespace hoteInventoryApi.Model
{
    public class User
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }  // Plain input
        public string ConfirmPassword { get; set; }
        public string Role { get; set; }
    }

}

namespace CACI.ViewModels
{
	public class UserViewModel : BaseViewModel
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public bool IsActive { get; set; }
        public bool IsApproved { get; set; }
        public string LastName { get; set; }

        public string Password { get; set; }

        public string MiddleName { get; set; } 
        public int UserID { get; set; }

        public bool UserName { get; set; }
         


    }
}

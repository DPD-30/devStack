
using System;

namespace CACI.DAL.Models
{
    public partial class User
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public bool IsActive { get; set; }
        public bool IsApproved { get; set; }
        public string LastName { get; set; }

        public string MiddleName { get; set; }
        public int UserId { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }
        public string ModifiedUser { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
		public int? RoleId { get; set; }
	}
}

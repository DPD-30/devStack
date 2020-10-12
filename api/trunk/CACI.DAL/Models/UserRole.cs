
using System;

namespace CACI.DAL.Models
{
    public partial class UserRole
    {
        public int UserRoleId { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public int IsActive { get; set; }
         
        public string ModifiedUser { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}

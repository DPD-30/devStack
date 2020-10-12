
using System;

namespace CACI.DAL.Models
{
    public partial class RoleClaim
    {
        public int RoleClaimId { get; set; }
        public int RoleId { get; set; }
        public int ClaimId { get; set; }
        public int IsActive { get; set; }

        public string ModifiedUser { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}

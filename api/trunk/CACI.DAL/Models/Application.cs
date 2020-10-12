using System;

namespace CACI.DAL.Models
{
    public partial class Application
    {
        public int ApplicationId { get; set; }
        public string ApplicationName { get; set; }

        public int StatusId { get; set; }

        public string SystemOwner { get; set; }

        public string IMatrixNumber { get; set; }

        public int PhaseId { get; set; }

        public string POC { get; set; }
        public bool IsActive { get; set; }

        public bool IsApproved { get; set; }

        public DateTime CreatedDate { get; set; }
        public string CreatedUser { get; set; }

        public DateTime ModifiedDate { get; set; }
        public string ModifiedUser { get; set; }

        public DateTime? Expiration { get; set; }

        public string Icon { get; set; }
    }
}

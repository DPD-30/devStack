using System;

namespace CACI.DAL.Models
{
    public partial class LocationCertification
    {
        public int LocationCertificationId { get; set; }
        public int LocationId { get; set; }
        public int StatusId { get; set; }
        public string Comments { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedUser { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedUser { get; set; }

        public virtual Location Location { get; set; }
    }
}

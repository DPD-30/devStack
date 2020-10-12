using System.Collections.Generic;

namespace CACI.DAL.Models
{
    public partial class Location
    {
        public Location()
        {
            LocationCertification = new HashSet<LocationCertification>();
            LocationPlan = new HashSet<LocationPlan>();
        }

        public int LocationId { get; set; }
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Critical { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }

        public virtual ICollection<LocationCertification> LocationCertification { get; set; }
        public virtual ICollection<LocationPlan> LocationPlan { get; set; }
    }
}

using System;

namespace CACI.DAL.Models
{
    public partial class LocationPlan
    {
        public int LocationPlanId { get; set; }
        public string PlanDetails { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedUser { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? StatusId { get; set; }
        public int? SectionId { get; set; }
        public int LocationId { get; set; }

        public virtual Location Location { get; set; }
    }
}

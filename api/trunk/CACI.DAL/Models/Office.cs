using System.Collections.Generic;

namespace CACI.DAL.Models
{
    public partial class Office
    {
        public Office()
        {
            CaseOffice = new HashSet<CaseOffice>();
        }

        public int OfficeId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<CaseOffice> CaseOffice { get; set; }
    }
}

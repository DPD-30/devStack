using System;
using System.Collections.Generic;

namespace CACI.DAL.Models
{
    public partial class Case
    {
        public Case()
        {
            CaseHistory = new HashSet<CaseHistory>();
            CaseOffice = new HashSet<CaseOffice>();
        }

        public int CaseId { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public int StatusId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastModifiedDate { get; set; }

        public virtual ICollection<CaseHistory> CaseHistory { get; set; }
        public virtual ICollection<CaseOffice> CaseOffice { get; set; }
    }
}

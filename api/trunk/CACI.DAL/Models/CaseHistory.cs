using System;

namespace CACI.DAL.Models
{
    public partial class CaseHistory
    {
        public int CaseHistoryId { get; set; }
        public string Description { get; set; }
        public int ActionId { get; set; }
        public int CaseId { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Action Action { get; set; }
        public virtual Case Case { get; set; }
    }
}

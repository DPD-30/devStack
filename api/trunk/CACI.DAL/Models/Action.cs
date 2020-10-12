using System.Collections.Generic;

namespace CACI.DAL.Models
{
    public partial class Action
    {
        public Action()
        {
            CaseHistory = new HashSet<CaseHistory>();
        }

        public int ActionId { get; set; }
        public string ActionName { get; set; }
        public string Description { get; set; }

        public virtual ICollection<CaseHistory> CaseHistory { get; set; }
    }
}

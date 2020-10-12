
namespace CACI.DAL.Models
{
    public partial class CaseOffice
    {
        public int CaseOfficeId { get; set; }
        public int CaseId { get; set; }
        public int OfficeId { get; set; }

        public virtual Case Case { get; set; }
    }
}

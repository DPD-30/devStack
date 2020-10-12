
namespace CACI.DAL.Models
{
    public partial class CaseSubject
    {
        public int CaseSubjectId { get; set; }
        public int SubjectId { get; set; }
        public int CaseId { get; set; }

        public virtual Subject Subject { get; set; }
    }
}

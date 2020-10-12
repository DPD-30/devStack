
namespace CACI.DAL.Models
{
    public partial class SubjectIdentification
    {
        public int SubjectIdentificationId { get; set; }
        public int SubjectId { get; set; }
        public int IdentificationId { get; set; }
        public string FirstName { get; set; }
        public string Description { get; set; }
        public string Identification { get; set; }

        public virtual Subject Subject { get; set; }
    }
}

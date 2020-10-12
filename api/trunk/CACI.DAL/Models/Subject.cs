using System.Collections.Generic;

namespace CACI.DAL.Models
{
    public partial class Subject
    {
        public Subject()
        {
            CaseSubject = new HashSet<CaseSubject>();
            SubjectIdentification = new HashSet<SubjectIdentification>();
        }

        public int SubjectId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Dob { get; set; }
        public string Description { get; set; }

        public virtual ICollection<CaseSubject> CaseSubject { get; set; }
        public virtual ICollection<SubjectIdentification> SubjectIdentification { get; set; }
    }
}

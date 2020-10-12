using System.Collections.Generic;

namespace CACI.DAL.Models
{
    public partial class Identification
    {
        public Identification()
        {
            SubjectIdentification = new HashSet<SubjectIdentification>();
        }

        public int IdentificationId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<SubjectIdentification> SubjectIdentification { get; set; }
    }
}

using System;

namespace CACI.ViewModels
{
	public class CaseViewModel
	{
        public int CaseId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int StatusID { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
    }
}

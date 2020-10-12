using System;

namespace CACI.ViewModels
{
	public class BaseViewModel
    {
        public string ModifiedUser { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; } 
    }
}

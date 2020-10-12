using System;

namespace CACI.ViewModels
{
	public class RoleViewModel
	{
		public int RoleID { get; set; }
		public string RoleTitle { get; set; }
		public string Description { get; set; }


		public string ModifiedUser { get; set; }
		public string CreatedUser { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime? ModifiedDate { get; set; }
	}
}

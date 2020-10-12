
using System;

namespace CACI.DAL.Models
{
	public partial class Role
	{
		public int RoleId { get; set; }
		public string RoleTitle { get; set; }
		public string Description { get; set; }

		public string ModifiedUser { get; set; }
		public string CreatedUser { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }

	}
}

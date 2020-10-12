using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.BAL
{
	public interface IUserRoleService
	{
		public IEnumerable<UserRole> Get();
		public bool Add(UserRole _obj);
		public bool Update(UserRole _obj);
		public bool Remove(UserRole _obj);
		public bool Remove(int _obj);


	}
}

using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.BAL
{
	public interface IRoleService
	{
		public IEnumerable<Role> Get();
		public bool Add(Role _obj);
		public bool Update(Role _obj);
		public bool Remove(Role _obj);
		public bool Remove(int _obj);


	}
}

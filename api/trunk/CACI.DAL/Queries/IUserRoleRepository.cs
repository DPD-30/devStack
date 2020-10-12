using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.DAL
{
    public interface IUserRoleRepository
    {
        public IEnumerable<UserRole> Get();
         
        public bool Add(UserRole _obj);

        public bool Update(UserRole _obj);

        public bool Delete(UserRole _obj);

        public bool Delete(int id);
    }
}

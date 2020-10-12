using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.DAL
{
    public interface IRoleRepository
    {
        public IEnumerable<Role> Get();
         
        public bool Add(Role _obj);

        public bool Update(Role _obj);

        public bool Delete(Role _obj);

        public bool Delete(int id);
    }
}

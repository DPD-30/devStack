using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.DAL
{
    public interface IRoleClaimRepository
    {
        public IEnumerable<RoleClaim> Get();
         
        public bool Add(RoleClaim _obj);

        public bool Update(RoleClaim _obj);

        public bool Delete(RoleClaim _obj);

        public bool Delete(int id);
    }
}

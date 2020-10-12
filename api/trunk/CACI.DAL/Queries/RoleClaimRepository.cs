using CACI.DAL.Models;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace CACI.DAL
{
    public class RoleClaimRepository : IRoleClaimRepository
    {
        private readonly CacidbContext caciDbContent;
        private readonly ILogger<RoleClaimRepository> logger;

        public RoleClaimRepository(CacidbContext _caciDbContent, ILogger<RoleClaimRepository> _logger)
        {
            caciDbContent = _caciDbContent;
            logger = _logger;
        }


        public IEnumerable<RoleClaim> Get()
        {

            return this.caciDbContent.RoleClaim.OrderBy(o => o.RoleClaimId).ToList();

        }

        public RoleClaim GetById(int id)
        {

            return this.caciDbContent.RoleClaim.Where(o => o.RoleClaimId == id) as RoleClaim;

        }

        public bool Add(RoleClaim _obj)
        {
            caciDbContent.RoleClaim.Add(_obj);

            return (caciDbContent.SaveChanges() > 0);
        }

        public bool Update(RoleClaim _obj)
        {

            caciDbContent.RoleClaim.Update(_obj);


            return (caciDbContent.SaveChanges() > 0);
        }

        public bool Delete(RoleClaim _obj)
        {

            caciDbContent.RoleClaim.Remove(_obj);

            return (caciDbContent.SaveChanges() > 0);
        }

        public bool Delete(int id)
        {

            RoleClaim caseToRemove = new RoleClaim() { RoleClaimId = id };
            caciDbContent.RoleClaim.Attach(caseToRemove);
            caciDbContent.RoleClaim.Remove(caseToRemove);

            return (caciDbContent.SaveChanges() > 0);
        }
    }
}

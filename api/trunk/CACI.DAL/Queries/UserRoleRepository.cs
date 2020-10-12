using CACI.DAL.Models;
using System.Collections.Generic;
using System.Linq;

namespace CACI.DAL
{
	public class UserRoleRepository : IUserRoleRepository
    {
        private readonly CacidbContext caciDbContent;

        public UserRoleRepository(CacidbContext _caciDbContent)
        {
            caciDbContent = _caciDbContent; 
        }


        public IEnumerable<UserRole> Get()
        {
            return this.caciDbContent.UserRole.OrderBy(o => o.UserRoleId).ToList();

        }

        public UserRole GetById(int id)
        {

            return this.caciDbContent.UserRole.Where(o => o.UserRoleId == id) as UserRole;

        }

        public bool Add(UserRole _obj)
        {

            caciDbContent.UserRole.Add(_obj);

            return (caciDbContent.SaveChanges() > 0);
        }

        public bool Update(UserRole _obj)
        {
            caciDbContent.UserRole.Update(_obj);

            return (caciDbContent.SaveChanges() > 0);
        }

        public bool Delete(UserRole _obj)
        {

            caciDbContent.UserRole.Remove(_obj);


            return (caciDbContent.SaveChanges() > 0);
        }

        public bool Delete(int id)
        {
            UserRole ToRemove = new UserRole() { UserRoleId = id };
            caciDbContent.UserRole.Attach(ToRemove);
            caciDbContent.UserRole.Remove(ToRemove);

            return (caciDbContent.SaveChanges() > 0);
        }
    }
}

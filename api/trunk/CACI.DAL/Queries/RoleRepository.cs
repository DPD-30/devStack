using CACI.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CACI.DAL
{
	public class RoleRepository : IRoleRepository
    {
        private readonly CacidbContext caciDbContent; 

        public RoleRepository(CacidbContext _caciDbContent)
        {
            caciDbContent = _caciDbContent; 
        }


        public IEnumerable<Role> Get()
        {
            return this.caciDbContent.Role.OrderBy(o => o.RoleId).ToList();

        }

        public Role GetById(int id)
        {

            return this.caciDbContent.Role.Where(o => o.RoleId == id) as Role;

        }

        public Role GetRolesByTitle(string name)
        {

            return this.caciDbContent.Role.First(f => f.RoleTitle == name);

        }

        public bool Add(Role _obj)
        {
            _obj.CreatedDate = DateTime.Now;
            _obj.ModifiedDate = DateTime.Now;
            caciDbContent.Role.Add(_obj);


            return (caciDbContent.SaveChanges() > 0);
        }

        public bool Update(Role _obj)
        {
            Role _ogObj = this.caciDbContent.Role.FirstOrDefault(o => o.RoleId == _obj.RoleId);

            _ogObj.ModifiedUser = _obj.ModifiedUser;
            _ogObj.ModifiedDate = DateTime.Now;
            _ogObj.Description = _obj.Description;
            _ogObj.RoleTitle = _obj.RoleTitle;
            caciDbContent.Role.Update(_ogObj);


            return (caciDbContent.SaveChanges() > 0);
        }

        public bool Delete(Role _obj)
        {

            _obj.ModifiedDate = DateTime.Now;
            caciDbContent.Role.Remove(_obj);

            return (caciDbContent.SaveChanges() > 0);
        }

        public bool Delete(int id)
        {

            Role ToRemove = new Role() { RoleId = id };
            caciDbContent.Role.Attach(ToRemove);
            caciDbContent.Role.Remove(ToRemove);


            return (caciDbContent.SaveChanges() > 0);
        }
    }
}

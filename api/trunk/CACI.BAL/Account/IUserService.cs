using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.BAL
{
    public interface IUserService
    {
        public IEnumerable<User> Get();
        public User GetById(int Id);
        public User Login(User _obj);
        public bool Add(User _obj);
        public bool Update(User _obj);
        public bool Delete(User _obj);
        public bool Delete(int _obj);
        public bool IsUserNameUnique(User _obj);
    }
}

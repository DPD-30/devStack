using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.DAL
{
	public interface IUserRepository
    {
        public IEnumerable<User> Get();

        public User GetById(int Id);

        public User Login(string Username, string Password);
        public bool Add(User _obj);

        public bool Update(User _obj);

        public bool Delete(User _obj);

        public bool Delete(int id);
    }
}

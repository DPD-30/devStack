using CACI.DAL.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CACI.DAL
{
	public class UserRepository : IUserRepository
    {
        private readonly CacidbContext caciDbContent;
        private readonly ILogger<UserRepository> logger;

        public UserRepository(CacidbContext _caciDbContent, ILogger<UserRepository> _logger)
        {
            caciDbContent = _caciDbContent;
            logger = _logger;
        }


        public IEnumerable<User> Get()
        {

            return this.caciDbContent.User.OrderBy(o => o.UserId).ToList();

        }

        public User GetById(int Id)
        {

            User myUser = this.caciDbContent.User.FirstOrDefault(o => o.UserId == Id);
            return myUser;

        }

        public User Login(string Username, string Password)
        {

            User myUser = this.caciDbContent.User.FirstOrDefault(o => o.UserName == Username && o.Password == Password);
            return myUser;

        }

        public bool Add(User _obj)
        {

            _obj.CreatedDate = DateTime.Now;
            _obj.ModifiedDate = DateTime.Now;
            caciDbContent.User.Add(_obj);


            return (caciDbContent.SaveChanges() > 0);
        }

        public bool Update(User _obj)
        {

        
            User _ogObj = this.caciDbContent.User.FirstOrDefault(o => o.UserId == _obj.UserId);

            _ogObj.ModifiedUser = _obj.ModifiedUser;
            _ogObj.ModifiedDate = DateTime.Now;

            if (string.IsNullOrEmpty(_obj.CreatedUser))
            {
                _ogObj.CreatedUser = _obj.ModifiedUser;
            }

            if (_obj.CreatedDate == System.DateTime.MinValue)
            {
                _ogObj.CreatedDate = DateTime.Now;
            }
            

            _ogObj.FirstName = _obj.FirstName;
            _ogObj.LastName = _obj.LastName;
            _ogObj.MiddleName = _obj.MiddleName;
            _ogObj.UserName = _obj.UserName;
            _ogObj.Email = _obj.Email;

			_ogObj.RoleId = _obj.RoleId;
			caciDbContent.User.Update(_ogObj);
            return (caciDbContent.SaveChanges() > 0);
        }

        public bool Delete(User _obj)
        {

            caciDbContent.User.Remove(_obj);

            return (caciDbContent.SaveChanges() > 0);
        }

        public bool Delete(int id)
        {

            User ToRemove = new User() { UserId = id };
            caciDbContent.User.Attach(ToRemove);
            caciDbContent.User.Remove(ToRemove);


            return (caciDbContent.SaveChanges() > 0);
        }
    }
}

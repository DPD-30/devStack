using AutoMapper;
using CACI.DAL;
using CACI.DAL.Models;
using CACI.ViewModels;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Collections.Generic;
using System.Linq;

namespace CACI.BAL
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IMapper mapper;

        public UserService(IUserRepository repository, IMapper _mapper)
        {
            _repository = repository;
            mapper = _mapper;
        }

        public IEnumerable<User> Get()
        {
            var _roles = _repository.Get();
            var viewModels = mapper.Map<IEnumerable<User>, IEnumerable<User>>(_roles);

            return viewModels;
        }

        public User GetById(int Id)
        {
            User MyUser = _repository.GetById(Id);
            return MyUser;
        }

        public User Login(User _obj)
        {
            string Hashed = EncryptPassword(_obj.Password);

            User MyUser = _repository.Login(_obj.UserName, Hashed);

            return MyUser;

        }


        public bool Add(User _obj)
        {
            if (IsUserNameUnique(_obj))
            {
                _obj.UserId = 0;
                _obj.CreatedDate = DateTime.Now;
                _obj.ModifiedDate = DateTime.Now;
                _obj.Password = EncryptPassword(_obj.Password);
                return _repository.Add(_obj);
            }
            else
            {
                throw new CaciChallengeException("Username already exists");

            }

        }

        public bool Update(User _obj)
        {
            _obj.ModifiedDate = DateTime.Now;
            _obj.Password = EncryptPassword(_obj.Password);
            return _repository.Update(_obj);
        }


        public bool Delete(User _obj)
        {
            var model = mapper.Map<User, User>(_obj);
            return _repository.Delete(model);
        }

        public bool Delete(int _obj)
        {
            return _repository.Delete(_obj);
        }

        public bool IsUserNameUnique(User _obj)
        {
            return !Get().Any(O => O.UserName == _obj.UserName);
        }

        private string EncryptPassword(string password)
        {
            string hash = string.Empty;
            byte[] salty = GenerateRandomCryptographicBytes(64);
            using (SHA512 sha512Hash = SHA512.Create())
            {
                //From String to byte array
                byte[] sourceBytes = Encoding.UTF8.GetBytes(password + salty);
                byte[] hashBytes = sha512Hash.ComputeHash(sourceBytes);
                hash = BitConverter.ToString(hashBytes).Replace("-", String.Empty);
            }

            return hash;

        }

        private byte[] GenerateRandomCryptographicBytes(int keyLength)
        {
            RNGCryptoServiceProvider rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            byte[] randomBytes = new byte[keyLength];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            return randomBytes;
        }

    }

}

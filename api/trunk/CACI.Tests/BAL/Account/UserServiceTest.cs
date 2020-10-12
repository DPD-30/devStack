using AutoMapper;
using CACI.BAL;
using CACI.DAL;
using CACI.DAL.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;

namespace CACI.Tests.BAL.Account
{
    [TestClass]
    public class UserServiceTest
    {
        private readonly Mock<IUserRepository> mockRepository;
        private readonly Mock<IMapper> mockMapper;

        public UserServiceTest()
        {
            mockRepository = new Mock<IUserRepository>();
            mockMapper = new Mock<IMapper>();
        }

        [TestMethod]
        public void UserService_Get()
        {
            UserService service = new UserService(mockRepository.Object, mockMapper.Object);

            var result = service.Get();

            Assert.IsNotNull(result);
        }

        public void UserService_GetById()
        {
            UserService service = new UserService(mockRepository.Object, mockMapper.Object);

            var result = service.GetById(1);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void UserService_Add()
        {
            UserService service = new UserService(mockRepository.Object, mockMapper.Object);

            User obj = new User()
            {
                //Email = "moq@test.local.com",
                FirstName = "Unit",
                MiddleName = "L",
                LastName = "Test",
                IsActive = true,
                IsApproved = true,
                UserName = "UnitTest",
                UserId = 0,

                Password = "PlainText",

                CreatedDate = DateTime.Now,
                CreatedUser = "UnitTestAdmin1",

                ModifiedDate = DateTime.Now,
                ModifiedUser = "UnitTestAdmin2",
            };

            bool result = service.Add(obj);

            Assert.IsFalse(result);
        }



        [TestMethod]
        public void UserService_Update()
        {
            UserService service = new UserService(mockRepository.Object, mockMapper.Object);

            User obj = new User()
            {
                //Email = "moq@test.local.com",
                FirstName = "Unit",
                MiddleName = "L",
                LastName = "Test",
                IsActive = true,
                IsApproved = true,
                UserName = "UnitTest",
                UserId = 0,

                CreatedDate = DateTime.Now,
                CreatedUser = "UnitTestAdmin1",

                ModifiedDate = DateTime.Now,
                ModifiedUser = "UnitTestAdmin2",
            };
            bool result = service.Update(obj);
            
            Assert.IsFalse(result);
        }



        [TestMethod]
        public void UserService_Remove()
        {
            UserService service = new UserService(mockRepository.Object, mockMapper.Object);

            User obj = new User()
            {
                //Email = "moq@test.local.com",
                FirstName = "Unit",
                MiddleName = "L",
                LastName = "Test",
                IsActive = true,
                IsApproved = true,
                UserName = "UnitTest",
                UserId = 0,

                CreatedDate = DateTime.Now,
                CreatedUser = "UnitTestAdmin1",

                ModifiedDate = DateTime.Now,
                ModifiedUser = "UnitTestAdmin2",
            };
            bool result = service.Delete(obj);
            
            Assert.IsFalse(result);
        }


        [TestMethod]
        public void UserService_RemoveById()
        {
            UserService service = new UserService(mockRepository.Object, mockMapper.Object);

            int roleId = 1;

            bool result = service.Delete(roleId);
            Assert.IsFalse(result);
        }

        [TestMethod]
        public void UserService_Login()
        {
            UserService service = new UserService(mockRepository.Object, mockMapper.Object);

            User obj = new User()
            {
                UserName = "bubba@home.com",
                Password = "plaintext",
            };

            User result = service.Login(obj);

            Assert.IsNull(result);
        }

    }
}

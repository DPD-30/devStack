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
	public class UserRoleServiceTest
	{
		private readonly Mock<IUserRoleRepository> mockRepository;
		private readonly Mock<IMapper> mockMapper;

		public UserRoleServiceTest()
		{
			mockRepository = new Mock<IUserRoleRepository>();
			mockMapper = new Mock<IMapper>();
		}

		[TestMethod]
		public void UserRoleService_Get()
		{
			UserRoleService service = new UserRoleService(mockRepository.Object, mockMapper.Object);
			 
			var result = service.Get();

			Assert.IsNotNull(result);
		}


		[TestMethod]
		public void UserRoleService_Add()
		{
			UserRoleService service = new UserRoleService(mockRepository.Object, mockMapper.Object);

			UserRole role = new UserRole()
			{
				UserRoleId =1,
				UserId = 1,
				ModifiedDate = DateTime.Now,
				IsActive = 1,
				ModifiedUser = "SYSTEM"
			};

			bool result = service.Add(role);

			Assert.IsFalse(result);
		}



		[TestMethod]
		public void UserRoleService_Update()
		{
			UserRoleService service = new UserRoleService(mockRepository.Object, mockMapper.Object);

			UserRole role = new UserRole()
			{
				UserRoleId = 1,
				UserId = 1,
				ModifiedDate = DateTime.Now,
				IsActive = 1,
				ModifiedUser = "SYSTEM"
			}; 
			bool result = service.Update(role)
;
			Assert.IsFalse(result);
		}



		[TestMethod]
		public void UserRoleService_Remove()
		{
			UserRoleService service = new UserRoleService(mockRepository.Object, mockMapper.Object);

			UserRole role = new UserRole()
			{
				UserRoleId = 1,
				UserId = 1,
				ModifiedDate = DateTime.Now,
				IsActive = 1,
				ModifiedUser = "SYSTEM"
			};
			bool result = service.Remove(role)
;
			Assert.IsFalse(result);
		}


		[TestMethod]
		public void UserRoleService_RemoveById()
		{
			UserRoleService service = new UserRoleService(mockRepository.Object, mockMapper.Object);

			int roleId = 1;

			bool result = service.Remove(roleId)
;
			Assert.IsFalse(result);
		}
	}
}

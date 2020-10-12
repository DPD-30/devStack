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
	public class RoleServiceTest
	{
		private readonly Mock<IRoleRepository> mockRepository;
		private readonly Mock<IMapper> mockMapper;

		public RoleServiceTest()
		{
			mockRepository = new Mock<IRoleRepository>();
			mockMapper = new Mock<IMapper>();
		}

		[TestMethod]
		public void RoleService_Get()
		{
			RoleService service = new RoleService(mockRepository.Object, mockMapper.Object);
			 
			var result = service.Get();

			Assert.IsNotNull(result);
		}


		[TestMethod]
		public void RoleService_Add()
		{
			RoleService service = new RoleService(mockRepository.Object, mockMapper.Object);

			Role role = new Role()
			{
				RoleTitle = "Test Role",
				RoleId = 1,
				Description = "Unit Test Role",
				CreatedDate = DateTime.Now,
				CreatedUser = "UnitTest",
			};

			bool result = service.Add(role);

			Assert.IsFalse(result);
		}



		[TestMethod]
		public void RoleService_Update()
		{
			RoleService service = new RoleService(mockRepository.Object, mockMapper.Object);

			Role role = new Role()
			{
				RoleTitle = "Test Role",
				RoleId = 1,
				Description = "Unit Test Role",
				CreatedDate = DateTime.Now,
				CreatedUser = "UnitTest",
			}; 
			bool result = service.Update(role)
;
			Assert.IsFalse(result);
		}



		[TestMethod]
		public void RoleService_Remove()
		{
			RoleService service = new RoleService(mockRepository.Object, mockMapper.Object);

			Role role = new Role()
			{
				RoleTitle = "Test Role",
				RoleId = 1,
				Description = "Unit Test Role",
				CreatedDate = DateTime.Now,
				CreatedUser = "UnitTest",
			};
			bool result = service.Remove(role)
;
			Assert.IsFalse(result);
		}


		[TestMethod]
		public void RoleService_RemoveById()
		{
			RoleService service = new RoleService(mockRepository.Object, mockMapper.Object);

			int roleId = 1;

			bool result = service.Remove(roleId)
;
			Assert.IsFalse(result);
		}
	}
}

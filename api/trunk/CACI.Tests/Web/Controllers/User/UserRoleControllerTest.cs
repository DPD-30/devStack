using CACI.BAL;
using CACI.Web.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;

namespace CACI.Tests.Web.Controllers
{
	[TestClass]
	public class UserRoleControllerTest
	{

		private readonly Mock<IUserRoleService> _mockService = new Mock<IUserRoleService>();

		[TestMethod]
		public void UserRoleService_Get()
		{
			UserRoleController _controller = new UserRoleController(_mockService.Object);
			var result = _controller.Get();

			Assert.IsNotNull(result);
		}


		[TestMethod]
		public void UserRoleService_Post()
		{
			CACI.DAL.Models.UserRole user = new CACI.DAL.Models.UserRole()
			{
				CreatedDate = DateTime.Now.AddDays(-8),
				ModifiedDate = DateTime.Now,
				RoleId = 1,
				UserId = 1,
				UserRoleId = 1

			};
			UserRoleController _controller = new UserRoleController(_mockService.Object);
			var result = _controller.Post(user);

			Assert.IsNotNull(result);
		}

		[TestMethod]
		public void UserRoleService_Put()
		{
			CACI.DAL.Models.UserRole application = new CACI.DAL.Models.UserRole()
			{

				CreatedDate = DateTime.Now.AddDays(-8),
				ModifiedDate = DateTime.Now,
				RoleId = 1,
				UserId = 1,
				UserRoleId = 1
			};
			UserRoleController _controller = new UserRoleController(_mockService.Object);
			var result = _controller.Put(application);

			Assert.IsNotNull(result);
		}


		[TestMethod]
		public void UserRoleService_DeleteById()
		{
			UserRoleController _controller = new UserRoleController(_mockService.Object);
			var result = _controller.Delete(1);

			Assert.IsNotNull(result);
		}


		[TestMethod]
		public void UserRoleService_DeleteFromBody()
		{
			CACI.DAL.Models.UserRole application = new CACI.DAL.Models.UserRole()
			{

				CreatedDate = DateTime.Now.AddDays(-8),
				ModifiedDate = DateTime.Now,
				UserRoleId = 1,
				RoleId = 1,
				UserId = 1,
			};
			UserRoleController _controller = new UserRoleController(_mockService.Object);
			var result = _controller.Delete(application);

			Assert.IsNotNull(result);
		}


	}
}

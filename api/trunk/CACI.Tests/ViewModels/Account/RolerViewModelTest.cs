using CACI.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace CACI.Tests.ViewModels.Account
{
	[TestClass]
	public class RoleViewModelTest
	{
		[TestMethod]
		public void RoleBlankObjectTest()
		{
			var createdDate = DateTime.Now;
			RoleViewModel obj = new RoleViewModel()
			{
				RoleID = 1,
				RoleTitle="New Role",
				Description="New Role",
				CreatedUser = "SYSTEM",
				CreatedDate = createdDate,
				ModifiedUser="SYSTEM",
				ModifiedDate = createdDate
			};

			//Act


			//Assert

			Assert.AreEqual(1, obj.RoleID);
			Assert.AreEqual("New Role", obj.RoleTitle);
			Assert.AreEqual("New Role", obj.Description);
			Assert.AreEqual("SYSTEM", obj.CreatedUser);
			Assert.AreEqual(createdDate, obj.CreatedDate);
			Assert.AreEqual("SYSTEM", obj.ModifiedUser);
			Assert.AreEqual(createdDate, obj.ModifiedDate);

		}
	}
}

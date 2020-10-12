using CACI.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.ViewModels.Account
{
	[TestClass]
	public class UserViewModelTest
	{
		[TestMethod]
		public void UserBlankObjectTest()
		{
			UserViewModel MyUser = new UserViewModel()
			{
				UserID = 1,
				FirstName = "Henry",
				MiddleName = "Leonid",
				LastName = "Wilson",
				Email = "Henry.Wilson@fake.email",
				IsActive = true,
				IsApproved = true,
				Password = "sdfwedfmosdf",
				UserName = true
			};

			//Act


			//Assert
			Assert.AreEqual(1, MyUser.UserID);
			Assert.AreEqual("Henry", MyUser.FirstName);
			Assert.AreEqual("Leonid", MyUser.MiddleName);
			Assert.AreEqual("Wilson", MyUser.LastName);
			Assert.AreEqual("Henry.Wilson@fake.email", MyUser.Email);
			Assert.AreEqual(true, MyUser.IsActive);
			Assert.AreEqual(true, MyUser.IsApproved);
			Assert.AreEqual("sdfwedfmosdf", MyUser.Password);
			Assert.AreEqual(true, MyUser.UserName);
		}
	}
}

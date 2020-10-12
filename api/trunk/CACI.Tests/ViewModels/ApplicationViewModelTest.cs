using CACI.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace CACI.Tests.ViewModels.Account
{
	[TestClass]
	public class ApplicationViewModelTest
	{
		[TestMethod]
		public void ApplicationBlankObjectTest()
		{
			ApplicationViewModel MyApplication = new ApplicationViewModel()
			{
				ApplicationId=1,
				ApplicationName="IMS",
				StatusId=1,
				SystemOwner="IMS",
				Expiration = System.DateTime.Today,
				IMatrixNumber ="1",
				PhaseId=1,
				POC="CTO",
				IsActive=true,
				IsApproved =true,
				CreatedUser="DEV",
				ModifiedUser="DEV",
				Icon="ICON",
				CreatedDate = DateTime.Today,
				ModifiedDate = DateTime.Today,

				
				

			};

			//Act


			//Assert

			Assert.AreEqual(1, MyApplication.ApplicationId);
			Assert.AreEqual("IMS", MyApplication.ApplicationName);
			Assert.AreEqual(1, MyApplication.StatusId);
			Assert.AreEqual("IMS", MyApplication.SystemOwner);
			Assert.AreEqual(1, MyApplication.ApplicationId);
			Assert.AreEqual("1", MyApplication.IMatrixNumber);
			Assert.AreEqual(System.DateTime.Today, MyApplication.Expiration);
			Assert.AreEqual(1, MyApplication.PhaseId);
			Assert.AreEqual("CTO", MyApplication.POC);
			Assert.AreEqual(true, MyApplication.IsActive);
			Assert.AreEqual(true, MyApplication.IsApproved);
			Assert.AreEqual("DEV", MyApplication.CreatedUser);
			Assert.AreEqual("DEV", MyApplication.ModifiedUser);
			Assert.AreEqual("ICON", MyApplication.Icon);
			Assert.AreEqual(DateTime.Today, MyApplication.CreatedDate);
			Assert.AreEqual(DateTime.Today, MyApplication.ModifiedDate);
		}
	}
}

using CACI.ViewModels;
using Microsoft.Graph;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace CACI.Tests.ViewModels.Cases
{
	[TestClass]
	public class CaseViewModelTest
	{
		[TestMethod]
		public void ResultBlankObjectTest()
		{
			var createdDate = DateTime.Now;
			CaseViewModel MyCase = new CaseViewModel()
			{
				CaseId = 1,
				Title = "New Case",
				Description = "New Description",
				StatusID =1,
				CreatedDate = createdDate,
				LastModifiedDate=createdDate
			};

			//Act


			//Assert

			Assert.AreEqual(1, MyCase.CaseId);
			Assert.AreEqual("New Case", MyCase.Title);
			Assert.AreEqual("New Description", MyCase.Description);
			Assert.AreEqual(1, MyCase.StatusID);
			Assert.AreEqual(createdDate, MyCase.CreatedDate);
			Assert.AreEqual(createdDate, MyCase.LastModifiedDate);

		}
	}
}

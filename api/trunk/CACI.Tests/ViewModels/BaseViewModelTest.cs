using CACI.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace CACI.Tests.ViewModels.Account
{
	[TestClass]
	public class BaseViewModelTest
	{
		[TestMethod]
		public void BaseBlankObjectTest()
		{
			var createdDate = DateTime.Now;
			BaseViewModel obj = new BaseViewModel()
			{
				CreatedUser = "SYSTEM",
				CreatedDate = createdDate,
				ModifiedUser = "SYSTEM",
				ModifiedDate = createdDate
			};

			Assert.AreEqual("SYSTEM", obj.CreatedUser);
			Assert.AreEqual(createdDate, obj.CreatedDate);
			Assert.AreEqual("SYSTEM", obj.ModifiedUser);
			Assert.AreEqual(createdDate,obj.ModifiedDate);
		}
	}
}

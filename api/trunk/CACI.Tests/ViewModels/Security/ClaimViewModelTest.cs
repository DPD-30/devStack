using CACI.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests
{
	[TestClass]
	public class ClaimUnitTest
	{
		[TestMethod]
		public void ClaimBlankObjectTest()
		{
			//Arrange
			ClaimViewModal claim = new ClaimViewModal()
			{
				ClaimId = 1,
				Description = "View",
				Title = "Viewing Permissions",
				ClaimCode = "NONE"
			};

			//Act


			//Assert
			Assert.AreEqual("View", claim.Description);
			Assert.AreEqual("Viewing Permissions", claim.Title);
			Assert.AreEqual("NONE", claim.ClaimCode);
			Assert.AreEqual(1, claim.ClaimId);
		}
	}
}

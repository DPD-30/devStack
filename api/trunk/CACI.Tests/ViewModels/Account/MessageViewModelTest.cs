using CACI.ViewModels.Account;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.ViewModels.Account
{
	[TestClass]
	public class AccountViewModelTest
	{
		[TestMethod]
		public void AccountViewModelBlankTest()
		{

			//Arrange
			AccountViewModel viewModel = new AccountViewModel()
			{ 
			};



			//Act


			//Assert
			Assert.IsNotNull(viewModel); 
		}
	}
}

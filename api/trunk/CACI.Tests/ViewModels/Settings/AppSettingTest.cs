using CACI.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.ViewModels.Settings
{
	[TestClass]
	public class AppSettingTest
	{
		[TestMethod]
		public void AccountViewModelBlankTest()
		{

			//Arrange
			AppSettingViewModel viewModel = new AppSettingViewModel()
			{
				AppSettingId = 1,
				AppSettingName = "UnitTest",
				AppSettingValue = "0"

			};



			//Act


			//Assert
			Assert.IsNotNull(viewModel);
			Assert.AreEqual(1, viewModel.AppSettingId);
			Assert.AreEqual("UnitTest", viewModel.AppSettingName);
			Assert.AreEqual("0", viewModel.AppSettingValue);
		}
	}
}

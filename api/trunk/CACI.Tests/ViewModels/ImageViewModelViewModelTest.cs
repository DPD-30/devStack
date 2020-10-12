using CACI.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.ViewModels.Account
{
    [TestClass]
	public class ImageViewModelViewModelTest
	{
		[TestMethod]
		public void ImageViewModelBlankObjectTest()
		{
			ImageViewModel MyImageViewModel = new ImageViewModel()
			{
                ImageId =1,
				Image="DOS.JPG"

			};

			//Act


			//Assert

			Assert.AreEqual(1, MyImageViewModel.ImageId);
			Assert.AreEqual("DOS.JPG", MyImageViewModel.Image);
		}
	}
}

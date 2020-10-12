using CACI.ViewModels.ATemplate;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.ViewModels.ATemplate
{
	[TestClass]
	public class ATemplateViewModelTest
	{
		[TestMethod]
		public void ATemplateBlankObjectTest()
		{
            ATemplateViewModel MyATemplate = new ATemplateViewModel()
			{
				Id=1
			};

			Assert.AreEqual(1,MyATemplate.Id);
		
		}
	}
}

using CACI.ViewModels.Messaging;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.ViewModels.Messaging
{
	[TestClass]
	public class MessageViewModelTest
	{
		[TestMethod]
		public void MessageViewModelBlankTest()
		{

			//Arrange
			MessageViewModel message = new MessageViewModel()
			{
				Response = "Operation completed successfully",
				Success = true
			};



			//Act


			//Assert
			Assert.IsNotNull(message);
			Assert.AreEqual("Operation completed successfully", message.Response);
			Assert.AreEqual(true, message.Success);
		}
	}
}

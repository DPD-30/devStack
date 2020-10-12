using System;
using CACI.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;


namespace CACI.Tests.ViewModels
{
    [TestClass]
    public class CaciChallengeExceptionTest
	{
		[TestMethod]
		public void BlankObjectTest()
		{
			var result = new CaciChallengeException();

			Assert.IsNotNull(result);
		}

		[TestMethod]
		public void ObjectWithMessageTest()
		{
			var result = new CaciChallengeException("TEST EXCEPTION");

			Assert.IsNotNull(result);
			Assert.AreEqual("TEST EXCEPTION", result.Message);
		}

		[TestMethod]
		public void ObjectWithMessageAndInnerExceptionTest()
		{
			var result = new CaciChallengeException("TEST EXCEPTION", new Exception("INNER EXCEPTION"));

			Assert.IsNotNull(result);
			Assert.AreEqual("TEST EXCEPTION", result.Message);
			Assert.IsNotNull(result.InnerException);
			Assert.AreEqual("INNER EXCEPTION", result.InnerException.Message);
		}
	}
}

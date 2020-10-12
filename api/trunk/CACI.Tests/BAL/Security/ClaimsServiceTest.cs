using CACI.BAL.Security;
using CACI.DAL;
using CACI.DAL.Models;
using CACI.ViewModels;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;

namespace CACI.Tests
{
	[TestClass]
	public class ClaimServiceTest
	{
		private readonly Mock<IClaimsRespository> mockRepository; 

		public ClaimServiceTest()
		{
			mockRepository = new Mock<IClaimsRespository>(); 
		}

		[TestMethod]
		public void GetClaims()
		{
			Claim mockClaimRecord = new Claim { ClaimId = 1, Title = "View Only", Description = "permission to view" };
			Claim request = new Claim { ClaimId = 0, Title = "", Description = "" };

			var mockClaimList = new List<Claim>
			{
				new Claim { ClaimId = 1, Title = "View Only", Description = "permission to view" }
			};

			mockRepository.Setup(m => m.GetClaims(It.IsAny<Claim>())).Returns(mockClaimList);

			var mockClaimService = new ClaimsService(mockRepository.Object);

			var result = mockClaimService.GetClaims(request);

			Assert.AreEqual(1, result.Count());
			Assert.AreEqual(result.FirstOrDefault().ClaimId, mockClaimRecord.ClaimId);
			Assert.AreEqual(result.FirstOrDefault().Title, mockClaimRecord.Title);
			Assert.AreEqual(result.FirstOrDefault().Description, mockClaimRecord.Description);

			mockClaimService.Should().NotBeNull();
		}


		[TestMethod]
		public void AddClaim()
		{
 
			Claim request = new Claim { ClaimId = 0, Title = "Test", Description = "Test" };

			mockRepository.Setup(m => m.AddClaim(It.IsAny<Claim>())).Returns(true);

			var mockClaimService = new ClaimsService(mockRepository.Object);

			var result = mockClaimService.AddClaim(request);

			mockClaimService.Should().NotBeNull();
			Assert.AreEqual(true, result);

		}

		[TestMethod]
		public void UpdateClaim()
		{
			Claim mockClaimRecord = new Claim { ClaimId = 2, Title = "Updated View Only", Description = "Updated permission to view" };
	 
			Claim request = mockClaimRecord;

			mockRepository.Setup(m => m.UpdateClaim(It.IsAny<Claim>())).Returns(true);

			var mockClaimService = new ClaimsService(mockRepository.Object);

			var result = mockClaimService.UpdateClaim(request);

			mockClaimService.Should().NotBeNull();
			Assert.AreEqual(true, result);

		}

		[TestMethod]
		public void DeleteClaim()
		{
			Claim mockClaimRecord = new Claim { ClaimId = 2, Title = "View Only", Description = "permission to view" };
 
			Claim request = mockClaimRecord;

			mockRepository.Setup(m => m.RemoveClaim(It.IsAny<Claim>())).Returns(true);

			var mockClaimService = new ClaimsService(mockRepository.Object);

			var result = mockClaimService.DeleteClaim(request);

			mockClaimService.Should().NotBeNull();
			Assert.AreEqual(true, result);

		}

		[TestMethod]
		public void DeleteClaimById()
		{
			ClaimViewModal mockClaimRecord = new ClaimViewModal { ClaimId = 2, Title = "View Only", Description = "permission to view" };

			mockRepository.Setup(m => m.DeleteClaimById(It.IsAny<int>())).Returns(true);

			var mockClaimService = new ClaimsService(mockRepository.Object);

			var result = mockClaimService.DeleteClaimById(mockClaimRecord.ClaimId);

			mockClaimService.Should().NotBeNull();
			Assert.AreEqual(true, result);

		}

	}
}

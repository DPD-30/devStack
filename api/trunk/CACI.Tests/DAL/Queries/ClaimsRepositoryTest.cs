using CACI.DAL;
using CACI.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;

namespace CACI.Tests.DAL
{
	[TestClass]
	public class ClaimsRepositoryTest
	{
		readonly private CacidbContext context;

		public ClaimsRepositoryTest()
		{

			var options = new DbContextOptionsBuilder<CacidbContext>()
				.UseInMemoryDatabase(databaseName: "CACIDB")
				.Options;

			context = new CacidbContext(options);

			context.Database.EnsureDeleted();
			context.Claim.Add(new Claim { ClaimId = 1, Title = "title 0", Description = "test 0", ClaimCode = "Test Code 0" });
			context.Claim.Add(new Claim { ClaimId = 2, Title = "title 1", Description = "test 1", ClaimCode = "Test Code 1" });
			context.Claim.Add(new Claim { ClaimId = 3, Title = "title 2", Description = "test 2", ClaimCode = "Test Code 2" });

			context.SaveChanges();
		}

		[TestMethod]
		public void GetClaims()
		{
			var logger = new Mock<ILogger<ClaimsRespository>>(); 

			// test Get All 
			ClaimsRespository claimsRepository = new ClaimsRespository(context, logger.Object);
			List<Claim> claims = claimsRepository.GetClaims(new Claim { ClaimId = 0, Title = "", Description = "" }).ToList();
			Assert.AreEqual(3, claims.Count);
		}


		[TestMethod]
		public void GetClaimById()
		{
			var logger = new Mock<ILogger<ClaimsRespository>>(); 

			ClaimsRespository claimsRepository = new ClaimsRespository(context, logger.Object);
			// test Get By AppSettingId
			List<Claim> claim = claimsRepository.GetClaims(new Claim { ClaimId = 1, Title = "", Description = "" }).ToList();
			Assert.AreEqual(1, claim.Count);
			Assert.AreEqual(1, claim.FirstOrDefault().ClaimId);
			Assert.AreEqual("title 0", claim.FirstOrDefault().Title);
			Assert.AreEqual("test 0", claim.FirstOrDefault().Description);

			claim = claimsRepository.GetClaims(new Claim { ClaimId = 2, Title = "", Description = "" }).ToList();
			Assert.AreEqual(1, claim.Count);
			Assert.AreEqual(2, claim.FirstOrDefault().ClaimId);
			Assert.AreEqual("title 1", claim.FirstOrDefault().Title);
			Assert.AreEqual("test 1", claim.FirstOrDefault().Description);

			claim = claimsRepository.GetClaims(new Claim { ClaimId = 3, Title = "", Description = "" }).ToList();
			Assert.AreEqual(1, claim.Count);
			Assert.AreEqual(3, claim.FirstOrDefault().ClaimId);
			Assert.AreEqual("title 2", claim.FirstOrDefault().Title);
			Assert.AreEqual("test 2", claim.FirstOrDefault().Description);

		}

		[TestMethod]
		public void GetClaimByTitle()
		{
			var logger = new Mock<ILogger<ClaimsRespository>>(); 

			ClaimsRespository repository = new ClaimsRespository(context, logger.Object);
			// test Get By Description
			List<Claim> claims = repository.GetClaims(new Claim { ClaimId = 0, Title = "title 0", Description = "" }).ToList();
			Assert.AreEqual(1, claims.Count);
			Assert.AreEqual(1, claims.FirstOrDefault().ClaimId);
			Assert.AreEqual("title 0", claims.FirstOrDefault().Title);
			Assert.AreEqual("test 0", claims.FirstOrDefault().Description);

			claims = repository.GetClaims(new Claim { ClaimId = 0, Title = "title 1", Description = "" }).ToList();
			Assert.AreEqual(1, claims.Count);
			Assert.AreEqual(2, claims.FirstOrDefault().ClaimId);
			Assert.AreEqual("title 1", claims.FirstOrDefault().Title);
			Assert.AreEqual("test 1", claims.FirstOrDefault().Description);

			claims = repository.GetClaims(new Claim { ClaimId = 0, Title = "title 2", Description = "" }).ToList();
			Assert.AreEqual(1, claims.Count);
			Assert.AreEqual(3, claims.FirstOrDefault().ClaimId);
			Assert.AreEqual("title 2", claims.FirstOrDefault().Title);
			Assert.AreEqual("test 2", claims.FirstOrDefault().Description);

		}


		[TestMethod]
		public void GetClaimByDescription()
		{
			var logger = new Mock<ILogger<ClaimsRespository>>();

			ClaimsRespository repository = new ClaimsRespository(context, logger.Object);
			// test Get By Title
			List<Claim> claims = repository.GetClaims(new Claim { ClaimId = 0, Title = "", Description = "test 0" }).ToList();
			Assert.AreEqual(1, claims.Count);
			Assert.AreEqual(1, claims.FirstOrDefault().ClaimId);
			Assert.AreEqual("title 0", claims.FirstOrDefault().Title);
			Assert.AreEqual("test 0", claims.FirstOrDefault().Description);

			claims = repository.GetClaims(new Claim { ClaimId = 0, Title = "title 1", Description = "test 1" }).ToList();
			Assert.AreEqual(1, claims.Count);
			Assert.AreEqual(2, claims.FirstOrDefault().ClaimId);
			Assert.AreEqual("title 1", claims.FirstOrDefault().Title);
			Assert.AreEqual("test 1", claims.FirstOrDefault().Description);

			claims = repository.GetClaims(new Claim { ClaimId = 0, Title = "title 2", Description = "test 2" }).ToList();
			Assert.AreEqual(1, claims.Count);
			Assert.AreEqual(3, claims.FirstOrDefault().ClaimId);
			Assert.AreEqual("title 2", claims.FirstOrDefault().Title);
			Assert.AreEqual("test 2", claims.FirstOrDefault().Description);
		}

		[TestMethod]
		public void AddClaim()
		{
			var logger = new Mock<ILogger<ClaimsRespository>>(); 

			ClaimsRespository repository = new ClaimsRespository(context, logger.Object);
			// test Get By AppSettingName
			bool result = repository.AddClaim(new Claim { ClaimId = 0, Title = "", Description = "test 0", ClaimCode = "code test" });
			Assert.AreEqual(true, result);

		}

		[TestMethod]
		public void UpdateSetting()
		{
			var logger = new Mock<ILogger<ClaimsRespository>>(); 

			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.Claim.Add(new Claim { ClaimId = 1, Title = "", Description = "" });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				ClaimsRespository repository = new ClaimsRespository(dbContext, logger.Object);
				// test Get By AppSettingName
				bool result = repository.UpdateClaim(new Claim { ClaimId = 1, Title = "title 2", Description = "test 22" });
				Assert.AreEqual(true, result);

				Assert.AreEqual(1, dbContext.Claim.ToList()[0].ClaimId);
				Assert.AreEqual("title 2", dbContext.Claim.ToList()[0].Title);
				Assert.AreEqual("test 22", dbContext.Claim.ToList()[0].Description);
			}

		}

		[TestMethod]
		public void RemoveSetting()
		{
			var logger = new Mock<ILogger<ClaimsRespository>>();
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.Claim.Add(new Claim { ClaimId = 1, Title = "", Description = "" });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				ClaimsRespository repository = new ClaimsRespository(dbContext, logger.Object);
				// test Get By AppSettingName
				bool result = repository.RemoveClaim(new Claim { ClaimId = 1, Title = "", Description = "" });
				Assert.AreEqual(true, result);

				List<Claim> claim = repository.GetClaims(new Claim { ClaimId = 1, Title = "", Description = "" }).ToList();
				Assert.AreEqual(0, claim.Count);
			}
		}


		[TestMethod]
		public void RemoveSettingById()
		{
			var logger = new Mock<ILogger<ClaimsRespository>>();
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.Claim.Add(new Claim { ClaimId = 1, Title = "", Description = "" });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				ClaimsRespository repository = new ClaimsRespository(dbContext, logger.Object);
				// test Get By AppSettingName
				bool result = repository.DeleteClaimById(1);
				Assert.AreEqual(true, result);

				List<Claim> claim = repository.GetClaims(new Claim { ClaimId = 1, Title = "", Description = "" }).ToList();
				Assert.AreEqual(0, claim.Count);
			}
		}
	}

}

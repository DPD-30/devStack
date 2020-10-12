using CACI.DAL;
using CACI.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CACI.Tests.DAL
{
	[TestClass]
	public class RoleClaimRepositoryTest
	{
		readonly private CacidbContext context;

		public RoleClaimRepositoryTest()
		{

			var options = new DbContextOptionsBuilder<CacidbContext>()
				.UseInMemoryDatabase(databaseName: "CACIDB")
				.Options;

			context = new CacidbContext(options);

			context.Database.EnsureDeleted();
			context.RoleClaim.Add(new RoleClaim {
				RoleClaimId = 1, 
				CreatedDate = DateTime.Now,
				CreatedUser = "TestAdmin",
				ModifiedDate = DateTime.Now,
				ModifiedUser = "TestAdmin",
			});
			context.RoleClaim.Add(new RoleClaim { RoleClaimId = 2 });
			context.RoleClaim.Add(new RoleClaim { RoleClaimId = 3 });

			context.SaveChanges();
		}

		[TestMethod]
		public void GetRoleClaim()
		{
			var logger = new Mock<ILogger<RoleClaimRepository>>();

			// test Get All 
			RoleClaimRepository repository = new RoleClaimRepository(context, logger.Object);
			List<RoleClaim> cases = repository.Get().ToList();
			Assert.AreEqual(3, cases.Count);
		}

		[TestMethod]
		public void UpdateSetting()
		{
			var logger = new Mock<ILogger<RoleClaimRepository>>();

			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.RoleClaim.Add(new RoleClaim { RoleClaimId = 1});
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				RoleClaimRepository repository = new RoleClaimRepository(dbContext, logger.Object);
				// test Get By AppSettingName
				bool result = repository.Update(new RoleClaim { RoleClaimId = 1});
				Assert.AreEqual(true, result);

				Assert.AreEqual(1, dbContext.RoleClaim.ToList()[0].RoleClaimId); 
			}

		}

		[TestMethod]
		public void RemoveSetting()
		{
			var logger = new Mock<ILogger<RoleClaimRepository>>();
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.RoleClaim.Add(new RoleClaim { RoleClaimId = 1});
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				RoleClaimRepository repository = new RoleClaimRepository(dbContext, logger.Object);
				var caseOne = repository.Get().ToList().Where(m => m.RoleClaimId == 1).FirstOrDefault();
				bool result = repository.Delete(caseOne);
				Assert.AreEqual(true, result);

				List<RoleClaim> cases = repository.Get().ToList();
				Assert.AreEqual(0, cases.Count);
			}
		}


		[TestMethod]
		public void RemoveSettingById()
		{
			var logger = new Mock<ILogger<RoleClaimRepository>>();
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.RoleClaim.Add(new RoleClaim { RoleClaimId = 1 });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				RoleClaimRepository repository = new RoleClaimRepository(dbContext, logger.Object);
				// test Get By AppSettingName
				bool result = repository.Delete(1);
				Assert.AreEqual(true, result);

				List<RoleClaim> cases = repository.Get().ToList();
				Assert.AreEqual(0, cases.Count);
			}
		}
	}
}

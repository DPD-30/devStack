using CACI.DAL;
using CACI.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CACI.Tests.DAL
{
	[TestClass]
	public class UserRoleRepositoryTest
	{
		readonly private CacidbContext context;

		public UserRoleRepositoryTest()
		{

			var options = new DbContextOptionsBuilder<CacidbContext>()
				.UseInMemoryDatabase(databaseName: "CACIDB")
				.Options;

			context = new CacidbContext(options);

			context.Database.EnsureDeleted();
			context.UserRole.Add(new UserRole
			{
				UserRoleId = 1,
				CreatedDate = DateTime.Now,
				CreatedUser = "TestAdmin",
				ModifiedDate = DateTime.Now,
				ModifiedUser = "TestAdmin",
			});
			context.UserRole.Add(new UserRole { UserRoleId = 2 });
			context.UserRole.Add(new UserRole { UserRoleId = 3 });

			context.SaveChanges();
		}

		[TestMethod]
		public void GetUserRole()
		{ 
			// test Get All 
			UserRoleRepository repository = new UserRoleRepository(context);
			List<UserRole> cases = repository.Get().ToList();
			Assert.AreEqual(3, cases.Count);
		}

		[TestMethod]
		public void UpdateSetting()
		{ 
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.UserRole.Add(new UserRole { UserRoleId = 1 });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				UserRoleRepository repository = new UserRoleRepository(dbContext);
				// test Get By AppSettingName
				bool result = repository.Update(new UserRole { UserRoleId = 1 });
				Assert.AreEqual(true, result);

				Assert.AreEqual(1, dbContext.UserRole.ToList()[0].UserRoleId);
			}

		}

		[TestMethod]
		public void RemoveSetting()
		{ 
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.UserRole.Add(new UserRole { UserRoleId = 1 });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				UserRoleRepository repository = new UserRoleRepository(dbContext);
				var caseOne = repository.Get().FirstOrDefault(m => m.UserRoleId == 1);
				bool result = repository.Delete(caseOne);
				Assert.AreEqual(true, result);

				List<UserRole> cases = repository.Get().ToList();
				Assert.AreEqual(0, cases.Count);
			}
		}


		[TestMethod]
		public void RemoveSettingById()
		{ 
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.UserRole.Add(new UserRole { UserRoleId = 1 });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				UserRoleRepository repository = new UserRoleRepository(dbContext);
				// test Get By AppSettingName
				bool result = repository.Delete(1);
				Assert.AreEqual(true, result);

				List<UserRole> cases = repository.Get().ToList();
				Assert.AreEqual(0, cases.Count);
			}
		}
	}
}

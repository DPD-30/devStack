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
	public class RoleRepositoryTest
	{
		readonly private CacidbContext context;

		public RoleRepositoryTest()
		{

			var options = new DbContextOptionsBuilder<CacidbContext>()
				.UseInMemoryDatabase(databaseName: "CACIDB")
				.Options;

			context = new CacidbContext(options);

			context.Database.EnsureDeleted();
			context.Role.Add(new Role {
				RoleId = 1, 
				CreatedDate = DateTime.Now,
				CreatedUser = "TestAdmin",
				ModifiedDate = DateTime.Now,
				ModifiedUser = "TestAdmin",
			});
			context.Role.Add(new Role { RoleId = 2 });
			context.Role.Add(new Role { RoleId = 3 });

			context.SaveChanges();
		}

		[TestMethod]
		public void GetRole()
		{ 
			// test Get All 
			RoleRepository repository = new RoleRepository(context);
			List<Role> cases = repository.Get().ToList();
			Assert.AreEqual(3, cases.Count);
		}

		[TestMethod]
		public void UpdateSetting()
		{ 
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.Role.Add(new Role { RoleId = 1});
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				RoleRepository repository = new RoleRepository(dbContext);
				// test Get By AppSettingName
				bool result = repository.Update(new Role { RoleId = 1});
				Assert.AreEqual(true, result);

				Assert.AreEqual(1, dbContext.Role.ToList()[0].RoleId); 
			}

		}

		[TestMethod]
		public void RemoveSetting()
		{ 
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.Role.Add(new Role { RoleId = 1});
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				RoleRepository repository = new RoleRepository(dbContext);
				var caseOne = repository.Get().FirstOrDefault(m => m.RoleId == 1);
				bool result = repository.Delete(caseOne);
				Assert.AreEqual(true, result);

				List<Role> cases = repository.Get().ToList();
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
				dbContext.Role.Add(new Role { RoleId = 1 });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				RoleRepository repository = new RoleRepository(dbContext);
				// test Get By AppSettingName
				bool result = repository.Delete(1);
				Assert.AreEqual(true, result);

				List<Role> cases = repository.Get().ToList();
				Assert.AreEqual(0, cases.Count);
			}
		}
	}
}

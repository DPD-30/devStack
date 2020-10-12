using CACI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;


namespace CACI.Web.Controllers.Account
{
	[Route("[controller]")]
	[ApiController]
	[Authorize]
	[Microsoft.AspNetCore.Cors.EnableCors("_myAllowSpecificOrigins")]
	public class ADAccountController : ControllerBase
	{
		[HttpGet]
		public UserViewModel Get()
		{
			var identity = User.Identity as ClaimsIdentity; // Azure AD V2 endpoint specific
			UserViewModel user = new UserViewModel()
			{
				//Email = identity.Claims.FirstOrDefault(c => c.Type == "preferred_username")?.Value,
				FirstName = identity.Claims.FirstOrDefault(c => c.Type == "name")?.Value,
			};
		 
			return user;

		}


	}
}

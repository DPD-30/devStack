using CACI.Web.Utility;
using Microsoft.AspNetCore.Mvc;
using System;


namespace CACI.Web.Controllers.Secret
{
	[Route("api/[controller]")]
    [ApiController]
    public class SecretController : ControllerBase
    {
		[HttpGet]
		public string Get(string secret, string url)
		{
			String secretValue;
			secretValue = "Your Secret is " + SecretUtility.Get(secret, url);
			
			return secretValue;

		}


	}
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace CACI.Web.Controllers.Account
{
	[Route("[controller]")]
	[ApiController]
	[Authorize]
	public class ADUserController : ControllerBase
	{
		[HttpGet]
		public async Task<Microsoft.Graph.User> Get(string userPrincipalName)
		{

			GraphServiceClient graphClient = new GraphServiceClient(new AzureAuthenticationProvider());

			Microsoft.Graph.User user = await graphClient.Users[userPrincipalName].Request().GetAsync();
			return user;

		}


	}

	public class AzureAuthenticationProvider : IAuthenticationProvider
	{
		public IConfiguration Configuration { get; }
		public async Task AuthenticateRequestAsync(HttpRequestMessage request)
		{
			string tenantID = Configuration.GetSection("AzureAd:TenantId").Value.ToString();
			string clientId = Configuration.GetSection("AzureAd:ClientId").Value.ToString();
			string aadInstance = Configuration.GetSection("AzureAd:Instance").Value.ToString();
			string appKey = Configuration.GetSection("ADAppKey").Value.ToString();

			// get a token for the Graph without triggering any user interaction (from the cache, via multi-resource refresh token, etc)
			ClientCredential creds = new ClientCredential(clientId, appKey);
			// initialize AuthenticationContext with the token cache of the currently signed in user, as kept in the app's database
			AuthenticationContext authenticationContext = new AuthenticationContext(aadInstance + tenantID, null);
			AuthenticationResult authResult = await authenticationContext.AcquireTokenAsync("https://graph.microsoft.us/", creds);
			if (!request.Headers.Any(x => x.Key == "Authorization"))
			{

				request.Headers.Add("Authorization", "Bearer " + authResult.AccessToken);
			}
		}

	}
	// public class AzureAuthenticationProvider : IAuthenticationProvider
	// {
	//     public async Task AuthenticateRequestAsync(HttpRequestMessage request) {
	//         string clientId = "aa6e1719-1063-408d-bef0-78a2b5e74eb2";
	//         string tenantid = "4372dc21-107d-47e5-8753-42f9f04e8ee6";
	//AuthenticationContext authContext = new AuthenticationContext("https://login.microsoftonline.us/organizations/oauth2/v2.0/token");
	////AuthenticationContext authContext = new AuthenticationContext("https://login.microsoftonline.us/4372dc21-107d-47e5-8753-42f9f04e8ee6/oauth2/v2.0");

	////AuthenticationContext authContext = new AuthenticationContext("https://login.microsoftonline.us/organizations/oauth2/v2.0/authorize?client_id=c836cbdb-7a5b-44cc-a54f-564b4b486fc6&response_type=code%20id_token&scope=https%3A%2F%2Fmanagement.core.usgovcloudapi.net%2F%2Fuser_impersonation%20openid%20email%20profile&state=OpenIdConnect.AuthenticationProperties%3DcolbkD_lUSk7GUAd7BH05OlXbjHjjY8JvzlTCpac7kPaU0nazdht2afMUHp1w6XqP9yL9Al_PMunr7DRLPLcB25n8pW0S0oKMXBcb3mTdIro3uEXgMBbjfew7rCtYmoVNOdtK2iiFL57Yt1WF1UP-PiB8yLgtW6o2B5cU9dJRMBwtci34yQkycsq7OVEz0EOpEn9kewP8NNZb8oOiuI2hFRo-Z8yZS9nScvFTp8g2Ow&response_mode=form_post&nonce=637358117720981087.OTU4NmI4ZDYtZmMyNS00MTc0LTg3NmEtM2IyYWM0YmM1NzMxMDdhMTA5N2ItNDZkMi00MWZhLWJiZTItMzcwYzY5NmZhMGNh&redirect_uri=https%3A%2F%2Fportal.azure.us%2Fsignin%2Findex%2F&site_id=501430&msafed=0&client-request-id=1d825861-4b66-4037-84c7-4964d3bea6a8&x-client-SKU=ID_NET45&x-client-ver=5.3.0.0");

	//ClientCredential creds = new ClientCredential(clientId, clientSecret);

	//         AuthenticationResult authResult = await authContext.AcquireTokenAsync("https://graph.microsoft.us/", creds);

	//         request.Headers.Add("Authorization", "Bearer " + authResult.AccessToken);
	//     }

	// }
}

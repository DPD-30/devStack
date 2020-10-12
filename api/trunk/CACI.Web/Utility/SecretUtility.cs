using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using System;

namespace CACI.Web.Utility
{
    public static class SecretUtility
    {
        public static string Get(string secretName, string keyURI)
        {
            if (keyURI == "ignore")
            {
                return keyURI;
            }
            else
            {
                var client = new SecretClient(new Uri(keyURI), new DefaultAzureCredential());

                KeyVaultSecret secret = client.GetSecret(secretName);

                return secret.Value;
            }

        }
    }
}

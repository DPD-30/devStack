using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.BAL.Security
{
	public interface IClaimsService
    {
		public IEnumerable<Claim> GetClaims();
		public IEnumerable<Claim> GetClaims(Claim request); 
		public bool AddClaim(Claim claim);
		public bool UpdateClaim(Claim claim);
		public bool DeleteClaim(Claim claim);
		public bool DeleteClaimById(int id);
	}
}

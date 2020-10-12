using CACI.DAL;
using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.BAL.Security
{
	public class ClaimsService : IClaimsService
	{
		private readonly IClaimsRespository claimsRespository; 

		public ClaimsService(IClaimsRespository _claimsRespository)
		{
			claimsRespository = _claimsRespository; 
		}

		public IEnumerable<Claim> GetClaims()
		{
			return claimsRespository.GetClaims();
		}


		public IEnumerable<Claim> GetClaims(Claim request)
		{
			return claimsRespository.GetClaims(request);
		}

		public Claim GetClaimsByCode(string code)
		{
			return claimsRespository.GetClaimsByCode(code);
		}

		public Claim GetClaimsById(int id)
		{
			return claimsRespository.GetClaimsById(id);
		}

		public bool AddClaim(Claim claim)
		{
			claim.ClaimId = 0;
			return claimsRespository.AddClaim(claim);
		}

		public bool UpdateClaim(Claim claim)
		{
			return claimsRespository.UpdateClaim(claim);
		}

		public bool DeleteClaim(Claim claim)

		{
			return claimsRespository.RemoveClaim(claim);
		}

		public bool DeleteClaimById(int id)
		{
			return claimsRespository.DeleteClaimById(id);
		}
	}
}

using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.DAL
{
	public interface IClaimsRespository
    {
        public IEnumerable<Claim> GetClaims();

        public IEnumerable<Claim> GetClaims(Claim request);

        public Claim GetClaimsById(int id);

        public Claim GetClaimsByCode(string code);

        public bool AddClaim(Claim claim);

        public bool UpdateClaim(Claim claim);

        public bool RemoveClaim(Claim claim);

        public bool DeleteClaimById(int id);
    }
}

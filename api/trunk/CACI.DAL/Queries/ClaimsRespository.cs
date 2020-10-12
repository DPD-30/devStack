using CACI.DAL.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CACI.DAL
{
    public class ClaimsRespository : IClaimsRespository
    {
        private readonly CacidbContext caciDbContent;
        private readonly ILogger<ClaimsRespository> logger;

        public ClaimsRespository(CacidbContext _caciDbContent, ILogger<ClaimsRespository> _logger)
        {
            caciDbContent = _caciDbContent;
            logger = _logger;
        }

        public IEnumerable<Claim> GetClaims()
        {
            return this.caciDbContent.Claim.OrderBy(o => o.ClaimId).ToList();

        }

        public IEnumerable<Claim> GetClaims(Claim request)
        {
            IEnumerable<Claim> claims = null;
            if (request != null && request.ClaimId > 0)
            {
                if (string.IsNullOrEmpty(request.ClaimCode) && string.IsNullOrEmpty(request.Description))
                {
                    claims = this.caciDbContent.Claim.Where(f => f.ClaimId == request.ClaimId).ToList();
                }
                else if (!string.IsNullOrEmpty(request.Title) && string.IsNullOrEmpty(request.Description))
                {
                    claims = this.caciDbContent.Claim.Where(f => f.ClaimId == request.ClaimId && f.Title == request.Title).ToList();
                }
                else if (!string.IsNullOrEmpty(request.Title) && !string.IsNullOrEmpty(request.Description))
                {
                    claims = this.caciDbContent.Claim.Where(f => f.ClaimId == request.ClaimId && f.Title == request.Title && f.Description.Contains(request.Description)).ToList();
                }
            }
            else if (request != null && request.ClaimId == 0)
            {

                if (!string.IsNullOrEmpty(request.Title) && string.IsNullOrEmpty(request.Description))
                {
                    claims = this.caciDbContent.Claim.Where(f => f.Title == request.Title).ToList();
                }
                else if (string.IsNullOrEmpty(request.Title) && !string.IsNullOrEmpty(request.Description))
                {
                    claims = this.caciDbContent.Claim.Where(f => f.Description.Contains(request.Description)).ToList();
                }
                else if (!string.IsNullOrEmpty(request.Title) && !string.IsNullOrEmpty(request.Description))
                {
                    claims = this.caciDbContent.Claim.Where(f => f.Title == request.Title && f.Description.Contains(request.Description)).ToList();
                }
            }

            if (claims == null)
            {
                claims = this.caciDbContent.Claim.OrderBy(o => o.ClaimId).ToList();
            }

            return claims;

        }

        public Claim GetClaimsById(int id)
        {
            return caciDbContent.Claim.First(f => f.ClaimId == id);

        }

        public Claim GetClaimsByCode(string code)
        {
            return caciDbContent.Claim.Where(f => f.ClaimCode == code) as Claim;

        }

        public bool AddClaim(Claim claim)
        {
            caciDbContent.Claim.Add(claim);


            return (caciDbContent.SaveChanges() > 0);
        }

        public bool UpdateClaim(Claim claim)
        {

            caciDbContent.Claim.Update(claim);

            return (caciDbContent.SaveChanges() > 0);
        }

        public bool RemoveClaim(Claim claim)
        {

            caciDbContent.Claim.Remove(claim);

            return (caciDbContent.SaveChanges() > 0);
        }

        public bool DeleteClaimById(int id)
        {
            Claim claimToRemove = new Claim() { ClaimId = id };
            caciDbContent.Claim.Attach(claimToRemove);
            caciDbContent.Claim.Remove(claimToRemove);

            return (caciDbContent.SaveChanges() > 0);
        }
    }
}

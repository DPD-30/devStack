using CACI.BAL.Security;
using CACI.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace CACI.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClaimsController : ControllerBase
    {
        private readonly IClaimsService claimService;

        public ClaimsController(IClaimsService _claimService, ILogger<ClaimsController> _logger)
        {
            claimService = _claimService;
        }

        [HttpGet]
        //[ValidateAntiForgeryToken]
        //[Authorize(Roles ="admin")]
        public ActionResult<IEnumerable<Claim>> Get()
        {
            var claims = claimService.GetClaims();
            return Ok(claims);

        }



        [HttpPost]
        public ActionResult Post([FromBody] Claim claim)
        {
            return Ok(claimService.AddClaim(claim));
        }

        [HttpPut]
        public ActionResult Put([FromBody] Claim claim)
        {
            return Ok(claimService.UpdateClaim(claim));

        }

        [HttpDelete]
        public IActionResult Delete([FromBody] Claim claim)
        {

            return Ok(claimService.DeleteClaim(claim));

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id > 0)
            {
                return Ok(claimService.DeleteClaimById(id));
            }
            else
            {
                return BadRequest("Failed to remove claim");
            }

        }
    }
}

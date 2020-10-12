using CACI.BAL;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CACI.Web.Controllers
{
	[Route("[controller]")]
    [ApiController]
    public class UniqueUserController : ControllerBase
    {
        private readonly IUserService _service;

        public UniqueUserController(IUserService service)
        {
            _service = service; 
        }

        [HttpGet] 
        public ActionResult<IEnumerable<CACI.DAL.Models.User>> Get(string userName)
        {
            return Ok(_service.IsUserNameUnique(new DAL.Models.User() { UserName = userName }));
        }
    }
}

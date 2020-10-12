using CACI.BAL;
using CACI.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CACI.Web.Controllers
{
	[Route("[controller]")]
    [ApiController]
    public class UserRoleController : ControllerBase
    {
        private readonly IUserRoleService _service; 

        public UserRoleController(IUserRoleService service)
        {
            _service = service;
        }
        [HttpGet]
        //[ValidateAntiForgeryToken]
        //[Authorize(UserRole ="admin")]
        public ActionResult<IEnumerable<UserRole>> Get()
        {
            return Ok(_service.Get());

        }


        [HttpPost]
        public IActionResult Post(UserRole _obj)
        {
            if (ModelState.IsValid)
            {
                return Ok(_service.Add(_obj));
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        [HttpPut]
        public ActionResult Put(UserRole _obj)
        {

            if (ModelState.IsValid)
            {
                return Ok(_service.Update(_obj));
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (ModelState.IsValid)
            {
                return Ok(_service.Remove(id));
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] UserRole _obj)
        {
            if (ModelState.IsValid)
            {
                return Ok(_service.Remove(_obj));
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}

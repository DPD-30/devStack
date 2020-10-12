using CACI.BAL;
using CACI.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace CACI.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserService service, ILogger<UserController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        //[ValidateAntiForgeryToken]
        //[Authorize(Role ="admin")]
        public ActionResult<IEnumerable<CACI.DAL.Models.User>> Get()
        {
            return Ok(_service.Get());

        }


        [HttpGet("{id}")]
        public ActionResult<IEnumerable<CACI.DAL.Models.User>> GetById(int id)
        {
            if (ModelState.IsValid)
            {

                return Ok(_service.GetById(id));
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [HttpPost]
        [ActionName("Login")]
        [Route("login")]
        public ActionResult<IEnumerable<CACI.DAL.Models.User>> Login(CACI.DAL.Models.User _obj)
        {
            if (ModelState.IsValid)
            {
                CACI.DAL.Models.User loggedInUser = _service.Login(_obj);
                if (loggedInUser == null) {

                    return Unauthorized();
                }
                else
                {

                    return Ok(_service.Login(_obj));
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost]
        public IActionResult Post(CACI.DAL.Models.User _obj)
        {
            try
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
            catch (Exception ex)
            {
                _logger.LogError($"Failed to post User: {ex}", ex);
            }

            return BadRequest("Failed to post User");
        }

        [HttpPut]
        public ActionResult Put(CACI.DAL.Models.User _obj)
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
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(_service.Delete(id));
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch
            {
                return BadRequest("Failed to delete");
            }
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] CACI.DAL.Models.User _obj)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(_service.Delete(_obj));
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch
            {
                return BadRequest("Failed to delete");
            }
        }
    }
}

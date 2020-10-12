using CACI.ViewModels.Notiication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CACI.Web.Controllers.Notification
{
	[ApiController]
	[Authorize]
	[Route("[controller]")]
	public class NotificationTypeController : ControllerBase
	{
		// GET: api/<NotificationTypeController>
		[HttpGet]
		public IEnumerable<NotificationType> Get()
		{
			return new List<NotificationType>();
		}

		// GET api/<NotificationTypeController>/5
		[HttpGet("{NotificationTypeID}")]
		public NotificationType Get(int id)
		{
			return new NotificationType();
		}
	}
}

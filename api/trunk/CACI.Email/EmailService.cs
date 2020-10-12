using CACI.ViewModels.Messaging;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;

namespace CACI.Email
{
	public class EmailService : IEmailService
	{

		private readonly ISmtpServer smtpService;

		public EmailService(ISmtpServer _smtpService)
		{
			smtpService = _smtpService;
		}


		public MessageViewModel SendEmail(string from, List<string> to, List<string> cc, List<string> bcc, string subject, string body, bool isBodyHtml)
		{
			MessageViewModel response = new MessageViewModel();

			MailMessage msg = new MailMessage()
			{
				Subject = subject,
				Body = body,
				IsBodyHtml = isBodyHtml,
				From = new MailAddress(from),
			};

			//Add To Addresses
			foreach (string emailAddress in to)
			{
				msg.To.Add(new MailAddress(emailAddress));
			}

			//Add CC Adresses
			if (cc != null)
			{
				foreach (string emailAddress in cc)
				{
					msg.CC.Add(new MailAddress(emailAddress));
				}
			}

			//Add BCC Adresses
			if (bcc != null)
			{
				foreach (string emailAddress in bcc)
				{
					msg.Bcc.Add(new MailAddress(emailAddress));
				}
			}

			try
			{
				string smtpServer = smtpService.Get();
				
				using (SmtpClient smtp = new SmtpClient(smtpServer))
				{
					smtp.Credentials = CredentialCache.DefaultNetworkCredentials;
					smtp.Send(msg);

				}

				response.Response = "Email Successfully Sent";
				response.Success = true;
			}
			catch (Exception ex)
			{
				response.Response = ex.Message;
				response.Success = false;
			}

			return response;
		}
	}
}

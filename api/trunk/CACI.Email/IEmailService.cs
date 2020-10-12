using CACI.ViewModels.Messaging;
using System.Collections.Generic;

namespace CACI.Email
{
	public interface IEmailService
    {
        public MessageViewModel SendEmail(string from, List<string> to, List<string> cc, List<string> bcc, string subject, string body, bool isBodyHtml);
    }
}

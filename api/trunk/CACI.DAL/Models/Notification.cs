using System;

namespace CACI.DAL.Models
{
    public partial class Notification
    {
        public int NotificationId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public int NotificationTypeId { get; set; }
        public string Message { get; set; }

        public virtual NotificationType NotificationType { get; set; }
    }
}

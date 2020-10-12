using System;
using System.Runtime.Serialization;

namespace CACI.ViewModels
{
    [Serializable]
    public class CaciChallengeException : Exception
    {
        public CaciChallengeException()
        {
        }

        public CaciChallengeException(string message)
            : base(message)
        {
        }

        protected CaciChallengeException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {           
        }

        public CaciChallengeException(string message, Exception inner)
            : base(message, inner)
        {
        }

        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            base.GetObjectData(info, context);
        }
    }
}
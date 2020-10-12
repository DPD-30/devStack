using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.DAL
{
    public interface ICasesRespository
    {
        public IEnumerable<Case> GetCases();
         
        public bool AddCase(Case _case);

        public bool UpdateCase(Case _case);

        public bool DeleteCase(Case _case);

        public bool DeleteCaseById(int id);
    }
}

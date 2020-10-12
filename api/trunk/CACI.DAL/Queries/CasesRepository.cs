using CACI.DAL.Models;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace CACI.DAL
{
    public class CasesRepository : ICasesRespository
    {
        private readonly CacidbContext caciDbContent;
        private readonly ILogger<CasesRepository> logger;

        public CasesRepository(CacidbContext _caciDbContent, ILogger<CasesRepository> _logger)
        {
            caciDbContent = _caciDbContent;
            logger = _logger;
        }


        public IEnumerable<Case> GetCases()
        {
            return this.caciDbContent.Case.OrderBy(o => o.CaseId).ToList();

        }

        public Case GetCaseById(int id)
        {

            return this.caciDbContent.Case.Where(o => o.CaseId == id) as Case;

        }

        public Case GetCasesByTitle(string name)
        {

            return this.caciDbContent.Case.First(f => f.Title == name);

        }

        public bool AddCase(Case _case)
        {
            caciDbContent.Case.Add(_case);


            return (caciDbContent.SaveChanges() > 0);
        }

        public bool UpdateCase(Case _case)
        {

            caciDbContent.Case.Update(_case);


            return (caciDbContent.SaveChanges() > 0);
        }

        public bool DeleteCase(Case _case)
        {

            caciDbContent.Case.Remove(_case);


            return (caciDbContent.SaveChanges() > 0);
        }

        public bool DeleteCaseById(int id)
        {

            Case caseToRemove = new Case() { CaseId = id };
            caciDbContent.Case.Attach(caseToRemove);
            caciDbContent.Case.Remove(caseToRemove);

            return (caciDbContent.SaveChanges() > 0);
        }
    }
}

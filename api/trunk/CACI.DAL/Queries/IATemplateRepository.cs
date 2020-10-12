using System.Collections.Generic;
using CACI.DAL.Models;

namespace CACI.DAL
{
    public interface IATemplateRepository
    {
        IEnumerable<CACI.DAL.Models.ATemplate> Get(); // Return all records
        CACI.DAL.Models.ATemplate GetById(int id); // Return a record
        CACI.DAL.Models.ATemplate Insert(ATemplate saveMe); // Insert a record
        CACI.DAL.Models.ATemplate Update(ATemplate saveMe); // Update record
        bool Delete(int id); // Delete a record
    }
}

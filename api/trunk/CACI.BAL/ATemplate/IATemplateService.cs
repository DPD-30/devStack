using System.Collections.Generic;
using CACI.ViewModels.ATemplate;

namespace CACI.BAL.ATemplate
{
    public interface IATemplateService
    {
        IEnumerable<ATemplateViewModel> GetAll(); // Return all records
        ATemplateViewModel GetById(int id); // Return a record
        ATemplateViewModel Add(ATemplateViewModel saveMe); // Insert a record
        ATemplateViewModel Update(ATemplateViewModel saveMe); // Update record
        bool Remove(int id); // Delete a record
    }
}

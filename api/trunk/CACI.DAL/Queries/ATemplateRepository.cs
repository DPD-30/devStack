using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using CACI.DAL.Models;

namespace CACI.DAL
{
    public class ATemplateRepository : IATemplateRepository
    {
        private readonly CacidbContext caciDbContent;
        private readonly ILogger<ATemplateRepository> logger;

        public ATemplateRepository(CacidbContext _caciDbContent, ILogger<ATemplateRepository> _logger)
        {
            caciDbContent = _caciDbContent;
            logger = _logger;
        }

        public IEnumerable<ATemplate> Get() // Return all records
        {
            return caciDbContent.ATemplate.OrderBy(e => e.Id).ToList();
        }

        public ATemplate GetById(int id) // Return a record
        {
            return caciDbContent.ATemplate.FirstOrDefault(e => e.Id == id);
        }

        public ATemplate Insert(ATemplate saveMe) // Insert a record
        {
            caciDbContent.ATemplate.Add(saveMe);

            if (caciDbContent.SaveChanges() <= 0) throw new DbUpdateException("Unknown error");

            return saveMe;
        }

        public ATemplate Update(ATemplate saveMe) // Update record
        {
            var dao = caciDbContent.ATemplate.First(e => e.Id == saveMe.Id);

            dao.Id = saveMe.Id;

            caciDbContent.ATemplate.Update(dao);

            if (caciDbContent.SaveChanges() <= 0) throw new DbUpdateException("Unknown error");

            return saveMe;
        }

        public bool Delete(int id) // Delete a record
        {
            var deleteMe = caciDbContent.ATemplate.First(e => e.Id == id);
            caciDbContent.ATemplate.Remove(deleteMe);
            return (caciDbContent.SaveChanges() > 0);
        }
    }
}

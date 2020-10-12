using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using AutoMapper;
using CACI.ViewModels.ATemplate;
using CACI.DAL;
using CACI.ViewModels;

namespace CACI.BAL.ATemplate
{
    public class ATemplateService : IATemplateService
    {
        private readonly IATemplateRepository repository;
        private readonly ILogger<ATemplateService> logger;
        private readonly IMapper mapper;

        public ATemplateService(IATemplateRepository _repository, IMapper _mapper, ILogger<ATemplateService> _logger)
        {
            repository = _repository;
            mapper = _mapper;
            logger = _logger;
        }

        public IEnumerable<ATemplateViewModel> GetAll() // Return all records
        {
            try
            {
                var dao = repository.Get();
                var result = mapper.Map<IEnumerable<ATemplateViewModel>>(dao);
                return result;
            }
            catch (Exception ex)
            {
                var message = $"{this.GetType().FullName} - Failed to get the items: {ex}";
                logger.LogError(message, ex);
                throw new CaciChallengeException(message, ex);
            }
        }
        public ATemplateViewModel GetById(int id) // Return a record
        {
            try
            {
                var dao = repository.GetById(id);
                var result = mapper.Map<ATemplateViewModel>(dao);
                return result;
            }
            catch (Exception ex)
            {
                var message = $"{this.GetType().FullName} - Failed to get the item: {ex}";
                logger.LogError(message, ex);
                throw new CaciChallengeException(message, ex);
            }
        }
        public ATemplateViewModel Add(ATemplateViewModel saveMe) // Insert a record
        {
            try
            {
                var dao = mapper.Map<CACI.DAL.Models.ATemplate>(saveMe);
                var result = repository.Insert(dao);
                return mapper.Map<ATemplateViewModel>(result);
            }
            catch (Exception ex)
            {
                var message = $"{this.GetType().FullName} - Failed to save the item: {ex}";
                logger.LogError(message, ex);
                throw new CaciChallengeException(message, ex);
            }
        }
        public ATemplateViewModel Update(ATemplateViewModel saveMe) // Update record
        {
            try
            {
                var dao = mapper.Map<CACI.DAL.Models.ATemplate>(saveMe);
                var result = repository.Update(dao);
                return mapper.Map<ATemplateViewModel>(result);
            }
            catch (Exception ex)
            {
                var message = $"{this.GetType().FullName} - Failed to save the item: {ex}";
                logger.LogError(message, ex);
                throw new CaciChallengeException(message, ex);
            }
        }
        public bool Remove(int id) // Delete a record
        {
            try
            {
                return repository.Delete(id);
            }
            catch (Exception ex)
            {
                var message = $"{this.GetType().FullName} - Failed to delete the item: {ex}";
                logger.LogError(message, ex);
                throw new CaciChallengeException(message, ex);
            }
        }
    }
}

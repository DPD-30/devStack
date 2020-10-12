using AutoMapper;
using CACI.DAL;
using CACI.DAL.Models;
using CACI.ViewModels;
using System;
using System.Collections.Generic;

namespace CACI.BAL.Cases
{
    public class CasesService : ICasesService
    {
        private readonly ICasesRespository casesRepository;
        private readonly IMapper mapper;

        public CasesService(ICasesRespository _casesRepository, IMapper _mapper)
        {
            casesRepository = _casesRepository;
            mapper = _mapper;
        }

		public IEnumerable<CaseViewModel> GetCases()
		{
			var _cases = casesRepository.GetCases();
			var viewModels = mapper.Map<IEnumerable<CACI.DAL.Models.Case>, IEnumerable<CaseViewModel>>(_cases);

			return viewModels;
		}
 
		public bool AddCase(CaseViewModel _case)
		{
			_case.CaseId = 0;
			var viewModels = mapper.Map<CaseViewModel, CACI.DAL.Models.Case>(_case);
			viewModels.CreatedDate = DateTime.Now;
			viewModels.LastModifiedDate = DateTime.Now;
			return casesRepository.AddCase(viewModels);
		}

		public bool UpdateCase(CaseViewModel _case)
		{
			var viewModels = mapper.Map<CaseViewModel, CACI.DAL.Models.Case>(_case);
			viewModels.LastModifiedDate = DateTime.Now;
			return casesRepository.UpdateCase(viewModels);
		}

		public bool RemoveCase(CaseViewModel _case)
		{
			var appSettingModel = mapper.Map<CaseViewModel, CACI.DAL.Models.Case>(_case);
			return casesRepository.DeleteCase(appSettingModel);
		}

		public bool RemoveCase(int id)
		{
			return casesRepository.DeleteCaseById(id);
		}
	}
}

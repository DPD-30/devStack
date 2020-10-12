using AutoMapper;
using CACI.DAL;
using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.BAL
{
	public class RoleService : IRoleService
	{
		private readonly IRoleRepository repository;
		private readonly IMapper mapper;

		public RoleService(IRoleRepository _repository, IMapper _mapper)
		{
			repository = _repository;
			mapper = _mapper;
		}

		public IEnumerable<Role> Get()
		{
			var _roles = repository.Get();
			var viewModels = mapper.Map<IEnumerable<Role>, IEnumerable<Role>>(_roles);

			return viewModels;
		}

		public bool Add(Role _obj)
		{
			_obj.RoleId = 0; 
			return repository.Add(_obj);
		}

		public bool Update(Role _obj)
		{ 
			return repository.Update(_obj);
		}

		public bool Remove(Role _obj)
		{
			var appSettingModel = mapper.Map<Role, Role>(_obj);
			return repository.Delete(appSettingModel);
		}
		public bool Remove(int _obj)
		{ 
			return repository.Delete(_obj);
		}

	}
}

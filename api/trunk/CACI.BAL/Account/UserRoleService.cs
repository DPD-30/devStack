using AutoMapper;
using CACI.DAL;
using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.BAL
{
	public class UserRoleService : IUserRoleService
	{
		private readonly IUserRoleRepository repository;
		private readonly IMapper mapper;

		public UserRoleService(IUserRoleRepository _repository, IMapper _mapper)
		{
			repository = _repository;
			mapper = _mapper;
		}

		public IEnumerable<UserRole> Get()
		{
			var _UserRoles = repository.Get();
			var viewModels = mapper.Map<IEnumerable<UserRole>, IEnumerable<UserRole>>(_UserRoles);

			return viewModels;
		}

		public bool Add(UserRole _obj)
		{
			_obj.UserRoleId = 0; 
			return repository.Add(_obj);
		}

		public bool Update(UserRole _obj)
		{ 
			return repository.Update(_obj);
		}

		public bool Remove(UserRole _obj)
		{
			var appSettingModel = mapper.Map<UserRole, UserRole>(_obj);
			return repository.Delete(appSettingModel);
		}
		public bool Remove(int _obj)
		{ 
			return repository.Delete(_obj);
		}

	}
}

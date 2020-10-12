using CACI.ViewModels;
using System.Collections.Generic;

namespace CACI.BAL.Cases
{
	public interface ICasesService
	{
		public IEnumerable<CaseViewModel> GetCases();
		public bool AddCase(CaseViewModel _case);
		public bool UpdateCase(CaseViewModel _case);
		public bool RemoveCase(CaseViewModel _case);
		public bool RemoveCase(int id);

	}
}

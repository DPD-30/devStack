using AutoMapper;
using CACI.DAL.Models;
using CACI.ViewModels;
using CACI.ViewModels.ATemplate;

namespace CACI.Web.Mapping
{
	public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CaseViewModel, Case>().ReverseMap();
            CreateMap<Case, CaseViewModel>().ReverseMap();
            CreateMap<Claim, ClaimViewModal>().ReverseMap();
            CreateMap<ClaimViewModal, Claim>().ReverseMap();
            CreateMap<AppSettings, AppSettingViewModel>().ReverseMap();
            CreateMap<AppSettingViewModel, AppSettings>().ReverseMap();
            CreateMap<Application, ApplicationViewModel>().ReverseMap();
          
            CreateMap<ATemplate, ATemplateViewModel>().ReverseMap();
            
        }
    }
}

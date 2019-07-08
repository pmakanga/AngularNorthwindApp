using AutoMapper;
using NorthWind.API.DTOs;
using NorthWind.API.Models;

namespace NorthWind.API.Helpers
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AddSupplierDTO, Suppliers>();
            CreateMap<EditSupplierDTO, Suppliers>();
            CreateMap<Suppliers, SupplierResponseDTO>();
        }
    }
}
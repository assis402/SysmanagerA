using SysManager.Application.Contracts.ProductType.Request;
using SysManager.Application.Data.MySql.Entities;
using SysManager.Application.Data.MySql.Repositories;
using SysManager.Application.Errors;
using SysManager.Application.Helpers;
using SysManager.Application.Validators.ProductType;
using SysManager.Application.Validators.Unity;
using System;
using System.Threading.Tasks;

namespace SysManager.Application.Services
{
    public class ProductTypeService
    {
        private readonly ProductTypeRepository _productTypeRepository;
        public ProductTypeService(ProductTypeRepository repository)
        {
            this._productTypeRepository = repository;
        }

        public async Task<ResultData> PostAsync(ProductTypePostRequest productType)
        {
            var validator = new ProductTypePostRequestValidator(_productTypeRepository);
            var validationResult = validator.Validate(productType);
            
            if (!validationResult.IsValid)
                return Utils.ErrorData(validationResult.Errors.ToErrorList());

            var entity = new ProductTypeEntity(productType);
            return Utils.SuccessData(await _productTypeRepository.CreateAsync(entity));
        }

        public async Task<ResultData> PutAsync(ProductTypePutRequest unity)
        {
            var validator = new ProductTypePutRequestValidator(_productTypeRepository);
            var validationResult = validator.Validate(unity);

            if (!validationResult.IsValid)
                return Utils.ErrorData(validationResult.Errors.ToErrorList());

            var entity = new ProductTypeEntity(unity);
            return Utils.SuccessData(await _productTypeRepository.UpdateAsync(entity));
        }

        public async Task<ResultData> GetFilterAsync(ProductTypeGetFilterRequest unity)
        {
            var response = await _productTypeRepository.GetProductTypeByFiltersync(unity);
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> GetAsync(Guid id)
        {
            var response = await _productTypeRepository.GetProductTypeByIdAsync(id);
            if (response == null)
                return Utils.ErrorData(SysManagerErrors.ProductType_Put_BadRequest_Id_Is_Invalid_Or_Inexistent.Description());

            return Utils.SuccessData(response);
        }

        public async Task<ResultData> DeleteAsync(Guid id)
        {
            var exists = await _productTypeRepository.GetProductTypeByIdAsync(id);
            if (exists == null)
                return Utils.ErrorData(SysManagerErrors.ProductType_Delete_BadRequest_Id_Is_Invalid_Or_Inexistent.Description());

            var response = await _productTypeRepository.DeleteAsync(id);
            return Utils.SuccessData(response);
        }


    }
}

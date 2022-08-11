using SysManager.Application.Contracts.Product.Request;
using SysManager.Application.Data.MySql.Entities;
using SysManager.Application.Data.MySql.Repositories;
using SysManager.Application.Errors;
using SysManager.Application.Helpers;
using SysManager.Application.Validators.Product;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SysManager.Application.Services
{
    public class ProductService
    {
        private readonly ProductRepository _productRepository;
        private readonly ProductTypeRepository _productTypeRepository;
        private readonly CategoryRepository _categoryRepository;
        private readonly UnityRepository _unityRepository;
        public ProductService(ProductRepository repository, 
                              ProductTypeRepository productTypeRepository, 
                              CategoryRepository categoryRepository, 
                              UnityRepository unityRepository)
        {
            this._productRepository = repository;
            this._productTypeRepository = productTypeRepository;
            this._categoryRepository = categoryRepository;
            this._unityRepository = unityRepository;
        }

        public async Task<ResultData> PostAsync(ProductPostRequest product)
        {
            if (product == null)
                return Utils.ErrorData(SysManagerErrors.Product_Post_BadRequest_Contract_Cannot_Be_Null.Description());

            var validator = new ProductPostRequestValidator(_productRepository, _productTypeRepository, _categoryRepository, _unityRepository);
            var validationResult = validator.Validate(product);

            if (!validationResult.IsValid)
                return Utils.ErrorData(validationResult.Errors.ToErrorList());

            var entity = new ProductEntity(product);
            return Utils.SuccessData(await _productRepository.CreateAsync(entity));
        }

        public async Task<ResultData> PutAsync(ProductPutRequest product)
        {
            if (product == null)
                return Utils.ErrorData(SysManagerErrors.Product_Put_BadRequest_Contract_Cannot_Be_Null.Description());

            var validator = new ProductPutRequestValidator(_productRepository, _productTypeRepository, _categoryRepository, _unityRepository);
            var validationResult = validator.Validate(product);

            if (!validationResult.IsValid)
                return Utils.ErrorData(validationResult.Errors.ToErrorList());

            var entity = new ProductEntity(product);
            return Utils.SuccessData(await _productRepository.UpdateAsync(entity));
        }

        public async Task<ResultData> GetFilterAsync(ProductGetFilterRequest unity)
        {
            var response = await _productRepository.GetProductByFiltersync(unity);
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> GetAsync(Guid id)
        {
            var response = await _productRepository.GetProductByIdAsync(id);
            if (response == null)
                return Utils.ErrorData(SysManagerErrors.Unity_Put_BadRequest_Id_Is_Invalid_Or_Inexistent.Description());

            return Utils.SuccessData(response);
        }

        public async Task<ResultData> DeleteAsync(Guid id)
        {
            var exists = await _productRepository.GetProductByIdAsync(id);
            if (exists == null)
                return Utils.ErrorData(SysManagerErrors.Unity_Delete_BadRequest_Id_Is_Invalid_Or_Inexistent.Description());

            var response = await _productRepository.DeleteAsync(id);
            return Utils.SuccessData(response);
        }

    }
}

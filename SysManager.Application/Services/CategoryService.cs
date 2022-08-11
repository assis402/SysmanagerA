
using SysManager.Application.Contracts.Category.Request;
using SysManager.Application.Data.MySql.Entities;
using SysManager.Application.Data.MySql.Repositories;
using SysManager.Application.Errors;
using SysManager.Application.Helpers;
using SysManager.Application.Validators.Category;
using System;
using System.Threading.Tasks;

namespace SysManager.Application.Services
{
    public class CategoryService
    {
        private readonly CategoryRepository _categoryRepository;
        public CategoryService(CategoryRepository repository)
        {
            this._categoryRepository = repository;
        }

        public async Task<ResultData> PostAsync(CategoryPostRequest category)
        {
            var validator = new CategoryPostRequestValidator(_categoryRepository);
            var validationResult = validator.Validate(category);
            
            if (!validationResult.IsValid)
                return Utils.ErrorData(validationResult.Errors.ToErrorList());

            var entity = new CategoryEntity(category);
            return Utils.SuccessData(await _categoryRepository.CreateAsync(entity));
        }

        public async Task<ResultData> PutAsync(CategoryPutRequest category)
        {
            var validator = new CategoryPutRequestValidator(_categoryRepository);
            var validationResult = validator.Validate(category);

            if (!validationResult.IsValid)
                return Utils.ErrorData(validationResult.Errors.ToErrorList());

            var entity = new CategoryEntity(category);
            return Utils.SuccessData(await _categoryRepository.UpdateAsync(entity));
        }

        public async Task<ResultData> GetFilterAsync(CategoryGetFilterRequest category)
        {
            var response = await _categoryRepository.GetCategoryByFiltersync(category);
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> GetAsync(Guid id)
        {
            var response = await _categoryRepository.GetCategoryByIdAsync(id);
            if (response == null)
                return Utils.ErrorData(SysManagerErrors.Unity_Put_BadRequest_Id_Is_Invalid_Or_Inexistent.Description());

            return Utils.SuccessData(response);
        }

        public async Task<ResultData> DeleteAsync(Guid id)
        {
            var exists = await _categoryRepository.GetCategoryByIdAsync(id);
            if (exists == null)
                return Utils.ErrorData(SysManagerErrors.Unity_Delete_BadRequest_Id_Is_Invalid_Or_Inexistent.Description());

            var response = await _categoryRepository.DeleteAsync(id);
            return Utils.SuccessData(response);
        }


    }
}

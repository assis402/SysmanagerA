using FluentValidation;
using SysManager.Application.Contracts.Product.Request;
using SysManager.Application.Data.MySql.Repositories;
using SysManager.Application.Errors;
using SysManager.Application.Helpers;
using System;

namespace SysManager.Application.Validators.Product
{
    public class ProductPutRequestValidator : AbstractValidator<ProductPutRequest>
    {
        public ProductPutRequestValidator(ProductRepository repository,
                                          ProductTypeRepository productTypeRepository,
                                          CategoryRepository categoryRepository,
                                          UnityRepository unityRepository
                                          )
        {

            RuleFor(product => product.Id)
                .Must(id => !string.IsNullOrEmpty(id.ToString()))
                .WithMessage(SysManagerErrors.Product_Put_BadRequest_Id_Cannot_Be_Null_Or_Empty.Description());

            RuleFor(product => product.Name)
                .Must(name => !string.IsNullOrEmpty(name))
                .WithMessage(SysManagerErrors.Product_Put_BadRequest_Name_Cannot_Be_Null_Or_Empty.Description());

            RuleFor(product => product.CostPrice)
                .Must(cost => cost >= 0)
                .WithMessage(SysManagerErrors.Product_Put_BadRequest_CostPrice_Must_Be_Greater_Than_Zero.Description());

            RuleFor(product => product)
                .Must(productPrice =>
                {
                    var _calc = productPrice.CostPrice + (productPrice.CostPrice * productPrice.Percentage) / 100;
                    return (productPrice.Price == _calc);
                })
                .WithMessage(SysManagerErrors.Product_Put_BadRequest_Price_Must_Be_Exact.Description());

            RuleFor(product => product)
                .Must(product =>
                {
                    var exists = repository.GetProductByNameAsync(product.Name).Result;
                    if (exists != null)
                        if (exists.Id != product.Id)
                            return false;
                    return true;
                })
                .WithMessage(SysManagerErrors.Product_Put_BadRequest_Name_Cannot_Be_Duplicated.Description());

            RuleFor(product => product)
                .Must(product =>
                {
                 var exists = repository.GetProductByProductCodeAsync(product.ProductCode).Result;

                    if (exists != null)
                        if (exists.Id != product.Id)
                            return false;
                    return true;
                })
                .WithMessage(SysManagerErrors.Product_Put_BadRequest_ProductCode_Cannot_Be_Duplicated.Description());

            RuleFor(product => product.Id)
                            .Must(id =>
                            {
                                var exists = repository.GetProductByIdAsync(id).Result;
                                return exists != null;
                            })
                            .WithMessage(SysManagerErrors.Product_Put_BadRequest_Id_Is_Invalid_Or_Inexistent.Description());

            RuleFor(product => product.ProductTypeId)
                            .Must(productType =>
                            {
                                try
                                {
                                    var exists = productTypeRepository.GetProductTypeByIdAsync(Guid.Parse(productType)).Result;
                                    return exists != null;
                                }
                                catch (Exception)
                                {
                                    return false;
                                }
                            })
                            .WithMessage(SysManagerErrors.Product_Put_BadRequest_ProductTypeId_Cannot_Be_Null_Empty_Or_Invalid.Description());

            RuleFor(product => product.CategoryId)
                            .Must(category =>
                            {
                                try
                                {
                                    var exists = categoryRepository.GetCategoryByIdAsync(Guid.Parse(category)).Result;
                                    return exists != null;
                                }
                                catch (Exception)
                                {
                                    return false;
                                }

                            })
                            .WithMessage(SysManagerErrors.Product_Put_BadRequest_CategoryId_Cannot_Be_Null_Empty_Or_Invalid.Description());

            RuleFor(product => product.UnityId)
                            .Must(unity =>
                            {
                                try
                                {
                                    var exists = unityRepository.GetByIdAsync(Guid.Parse(unity)).Result;
                                    return exists != null;
                                }
                                catch (Exception)
                                {
                                    return false;
                                }
                            })
                            .WithMessage(SysManagerErrors.Product_Put_BadRequest_UnityId_Cannot_Be_Null_Empty_Or_Invalid.Description());
        }
    }
}

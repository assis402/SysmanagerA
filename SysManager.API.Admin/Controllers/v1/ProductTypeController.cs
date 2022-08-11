using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SysManager.Application.Contracts.Category.Request;
using SysManager.Application.Contracts.ProductType.Request;
using SysManager.Application.Contracts.Unity.Request;
using SysManager.Application.Helpers;
using SysManager.Application.Services;
using System;
using System.Threading.Tasks;

namespace SysManager.API.Admin.Controllers.v1
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ProductTypeController
    {
        private readonly ProductTypeService _productTypeService;
        public ProductTypeController(ProductTypeService repository)
        {
            this._productTypeService = repository;
        }

        [HttpPost("insert")]
        public async Task<IActionResult> Post([FromBody] ProductTypePostRequest request)
        {
            var response = await _productTypeService.PostAsync(request);
            return Utils.Convert(response);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Put([FromBody] ProductTypePutRequest request)
        {
            var response = await _productTypeService.PutAsync(request);
            return Utils.Convert(response);
        }

        [HttpGet("getbyfilter")]
        public async Task<IActionResult> GetByfilter([FromQuery] ProductTypeGetFilterRequest request)
        {
            var response = await _productTypeService.GetFilterAsync(request);
            return Utils.Convert(response);
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            var response = await _productTypeService.GetAsync(id);
            return Utils.Convert(response);
        }

        [HttpDelete("id/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var response = await _productTypeService.DeleteAsync(id);
            return Utils.Convert(response);
        }
    }
}

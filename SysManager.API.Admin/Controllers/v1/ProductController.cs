using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SysManager.Application.Contracts.Category.Request;
using SysManager.Application.Contracts.Product.Request;
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
    public class ProductController
    {
        private readonly ProductService _productService;
        public ProductController(ProductService repository)
        {
            this._productService = repository;
        }

        [HttpPost("insert")]
        public async Task<IActionResult> Post([FromBody] ProductPostRequest request)
        {
            var response = await _productService.PostAsync(request);
            return Utils.Convert(response);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Put([FromBody] ProductPutRequest request)
        {
            var response = await _productService.PutAsync(request);
            return Utils.Convert(response);
        }

        [HttpGet("getbyfilter")]
        public async Task<IActionResult> GetByfilter([FromQuery] ProductGetFilterRequest request)
        {
            var response = await _productService.GetFilterAsync(request);
            return Utils.Convert(response);
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            var response = await _productService.GetAsync(id);
            return Utils.Convert(response);
        }

        [HttpDelete("id/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var response = await _productService.DeleteAsync(id);
            return Utils.Convert(response);
        }
    }
}

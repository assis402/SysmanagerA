using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SysManager.Application.Contracts.Category.Request;
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
    public class CategoryController
    {
        private readonly CategoryService _categoryService;
        public CategoryController(CategoryService unityService)
        {
            this._categoryService = unityService;
        }

        [HttpPost("insert")]
        public async Task<IActionResult> Post([FromBody] CategoryPostRequest request)
        {
            var response = await _categoryService.PostAsync(request);
            return Utils.Convert(response);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Put([FromBody] CategoryPutRequest request)
        {
            var response = await _categoryService.PutAsync(request);
            return Utils.Convert(response);
        }

        [HttpGet("getbyfilter")]
        public async Task<IActionResult> GetByfilter([FromQuery] CategoryGetFilterRequest request)
        {
            var response = await _categoryService.GetFilterAsync(request);
            return Utils.Convert(response);
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            var response = await _categoryService.GetAsync(id);
            return Utils.Convert(response);
        }

        [HttpDelete("id/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var response = await _categoryService.DeleteAsync(id);
            return Utils.Convert(response);
        }
    }
}

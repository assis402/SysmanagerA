using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    public class UnityController
    {
        private readonly UnityService _unityService;
        public UnityController(UnityService service)
        {
            this._unityService = service;
        }

        [HttpPost("insert")]
        public async Task<IActionResult> Post([FromBody] UnityPostRequest request)
        {
            var response = await _unityService.PostAsync(request);
            return Utils.Convert(response);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Put([FromBody] UnityPutRequest request)
        {
            var response = await _unityService.PutAsync(request);
            return Utils.Convert(response);
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var response = await _unityService.GetByIdAsync(id);
            return Utils.Convert(response);
        }

        [HttpGet("getbyfilter")]
        public async Task<IActionResult> GetByFilter([FromQuery] UnityGetFilterRequest request)
        {
            var response = await _unityService.GetByFilterAsync(request);
            return Utils.Convert(response);
        }

        [HttpDelete("id/{id}")]
        public async Task<IActionResult> DeleteById([FromRoute] Guid id)
        {
            var response = await _unityService.DeleteByIdAsync(id);
            return Utils.Convert(response);
        }

    }
}

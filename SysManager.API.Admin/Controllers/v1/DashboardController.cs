using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SysManager.Application.Contracts.Users.Request;
using SysManager.Application.Helpers;
using SysManager.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SysManager.API.Admin.Controllers.v1
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class DashboardController
    {

        private readonly DashboardService _service;
        public DashboardController(DashboardService service)
        {
            this._service = service;
        }


        [HttpGet("GetDashBoard")]
        public async Task<IActionResult> GetDashboard(string entity, string field, string join, string fieldjoin)
        {
            var result = await this._service.GetEntityAsync(entity, field, join, fieldjoin);
            return Utils.Convert(result);
        }


    }
}

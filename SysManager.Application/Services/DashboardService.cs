using SysManager.Application.Data.MySql.Repositories;
using SysManager.Application.Helpers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SysManager.Application.Services
{
    public class DashboardService
    {

        private readonly DashboardRepository _repository;
        public DashboardService(DashboardRepository repository)
        {
            this._repository = repository;
        }

        public async Task<ResultData> GetEntityAsync(string entity, string field, string join, string fieldjoin)
        {
            var result = await _repository.GetEntityByStatus(entity, field, join, fieldjoin);
            return Utils.SuccessData(result);
        }
    }
}

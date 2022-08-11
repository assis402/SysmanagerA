using Dapper;
using SysManager.Application.Contracts;
using SysManager.Application.Contracts.Unity.Request;
using SysManager.Application.Data.MySql.Entities;
using SysManager.Application.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysManager.Application.Data.MySql.Repositories
{
    public class UnityRepository
    {
        private readonly MySqlContext _context;

        public UnityRepository(MySqlContext context)
        {
            this._context = context;
        }

        public async Task<DefaultResponse> CreateAsync(UnityEntity entity)
        {
            var _sql = $"INSERT INTO unity(id, name, active) VALUE('{entity.Id}', '{entity.Name}', {entity.Active})";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(_sql);
                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Unidade de medida criada com sucesso", false);
            }
            return new DefaultResponse(entity.Id.ToString(), "Falha ao tentar cadastrar um unidade de medida", true);
        }
        public async Task<DefaultResponse> UpdateAsync(UnityEntity entity)
        {
            var _sql = $"UPDATE unity set name = '{entity.Name}', active = {entity.Active} WHERE id = '{entity.Id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(_sql);
                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Unidade de medida alterada com sucesso", false);
            }
            return new DefaultResponse(entity.Id.ToString(), "Falha ao tentar alterar um unidade de medida", true);
        }
        public async Task<UnityEntity> GetByIdAsync(Guid id)
        {
            var _sql = $"SELECT id, name, active from unity WHERE id = '{id}' limit 1";

            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryFirstOrDefaultAsync<UnityEntity>(_sql);
                return result;
            }
        }

        public async Task<UnityEntity> GetByNameAsync(string name)
        {
            var _sql = $"SELECT id, name, active from unity WHERE name = '{name}' limit 1";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryFirstOrDefaultAsync<UnityEntity>(_sql);
                return result;
            }
        }
        public async Task<DefaultResponse> DeleteByIdAsync(Guid id)
        {
            var _sql = $"DELETE from unity WHERE id = '{id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(_sql);
                if (result > 0)
                    return new DefaultResponse(id.ToString(), "Unidade de medida excluída com sucesso", false);
            }
            return new DefaultResponse(id.ToString(), "Falha ao tentar excluir uma unidade de medida", true);
        }

        public async Task<PaginationResponse<UnityEntity>> GetByFilterAsync(UnityGetFilterRequest filter)
        {
            var _sql = new StringBuilder("select * from unity where 1=1");
            var _where = new StringBuilder();

            if (!string.IsNullOrEmpty(filter.Name))
                _where.Append($" AND name like '%{filter.Name}%'");

            if (filter.Active.ToLower() != "todos" )
            {
                string _activeFilter = "";

                if (filter.Active.ToLower() == "ativos")
                    _activeFilter = " AND active = true";
                else if (filter.Active.ToLower() == "inativos")
                    _activeFilter = " AND active = false";

                _where.Append(_activeFilter);
            }

            _sql.Append(_where);

            if (filter.page > 0 && filter.pageSize > 0)
                _sql.Append($" limit {filter.pageSize * (filter.page - 1)}, {filter.pageSize}");

            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryAsync<UnityEntity>(_sql.ToString());
                var resultCount = await cnx.QueryAsync<int>("select count(*) as count from unity where 1=1"+ _where.ToString());
                return new PaginationResponse<UnityEntity>
                {
                    _page = filter.page,
                    _pageSize = filter.pageSize,
                    _total = resultCount.FirstOrDefault(),
                    Items = result.ToArray()
                };
            }
        }

    }
}

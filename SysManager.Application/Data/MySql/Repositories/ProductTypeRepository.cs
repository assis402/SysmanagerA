using Dapper;
using System;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using SysManager.Application.Contracts;
using SysManager.Application.Data.MySql.Entities;
using SysManager.Application.Helpers;
using SysManager.Application.Contracts.ProductType.Request;

namespace SysManager.Application.Data.MySql.Repositories
{
    public class ProductTypeRepository
    {

        private readonly MySqlContext _context;

        public ProductTypeRepository(MySqlContext ctt)
        {
            this._context = ctt;
        }

        public async Task<DefaultResponse> CreateAsync(ProductTypeEntity entity)
        {
            string strQuery = @"insert into productType(id, name, active)
                                              Values(@id, @name, @active)";

            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery, new
                {
                    id = entity.Id,
                    Name = entity.Name,
                    active = entity.Active
                });

                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Tipo de produto criado com sucesso", false);
            }
            return new DefaultResponse("", "Erro ao tentar criar Tipo de produto", true);
        }

        public async Task<DefaultResponse> UpdateAsync(ProductTypeEntity entity)
        {
            string strQuery = $"update productType set name = '{entity.Name}', active = {entity.Active} where id = '{entity.Id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);

                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Tipo de produto alterado com sucesso", false);
            }
            return new DefaultResponse(entity.Id.ToString(), "Erro ao tentar alterada Tipo de produto", true);
        }

        public async Task<DefaultResponse> DeleteAsync(Guid id)
        {
            string strQuery = $"delete from productType where id = '{id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);
                if (result > 0)
                    return new DefaultResponse(id.ToString(), "Tipo de produto excluída com sucesso", false);
            }
            return new DefaultResponse(id.ToString(), "Erro ao tentar excluír Tipo de produto", true);
        }

        public async Task<ProductTypeEntity> GetProductTypeByIdAsync(Guid id)
        {
            string strQuery = $"select id, name, active from productType where id = '{id}' limit 1";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryFirstOrDefaultAsync<ProductTypeEntity>(strQuery);
                return result;
            }
        }

        public async Task<ProductTypeEntity> GetProductTypeByNameAsync(string name)
        {
            string strQuery = $"select id, name, active from productType where name = '{name}' limit 1";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryFirstOrDefaultAsync<ProductTypeEntity>(strQuery);
                return result;
            }
        }

        public async Task<PaginationResponse<ProductTypeEntity>> GetProductTypeByFiltersync(ProductTypeGetFilterRequest filter)
        {
            using (var cnx = _context.Connection())
            {
                var _sql = new StringBuilder("select * from productType where 1=1");
                var where = new StringBuilder();

                if (!string.IsNullOrEmpty(filter.Name))
                    where.Append(" AND name like '%" + filter.Name + "%'");

                if (filter.Active.ToLower() != "todos")
                {
                    string _booleanFilter = "";
                    if (filter.Active.ToLower() == "ativos")
                        _booleanFilter = " AND active = true";
                    else if (filter.Active.ToLower() == "inativos")
                        _booleanFilter = " AND active = false";

                    where.Append(_booleanFilter);
                }

                _sql.Append(where);

                if (filter.page > 0 && filter.pageSize > 0)
                    _sql.Append($" Limit {filter.pageSize * (filter.page - 1)}, {filter.pageSize}");

                var result = await cnx.QueryAsync<ProductTypeEntity>(_sql.ToString());
                var result2 = await cnx.QueryAsync<int>("select count(*) as count from productType where 1=1 " + where.ToString());
                var totalRows = result2.FirstOrDefault();

                return new PaginationResponse<ProductTypeEntity>
                {
                    Items = result.ToArray(),
                    _pageSize = filter.pageSize,
                    _page = filter.page,
                    _total = totalRows
                };

            }
        }


    }
}

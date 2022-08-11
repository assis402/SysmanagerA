using Dapper;
using System;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using SysManager.Application.Contracts;
using SysManager.Application.Data.MySql.Entities;
using SysManager.Application.Helpers;
using SysManager.Application.Contracts.Product.Request;

namespace SysManager.Application.Data.MySql.Repositories
{
    public class ProductRepository
    {

        private readonly MySqlContext _context;

        public ProductRepository(MySqlContext ctt)
        {
            this._context = ctt;
        }

        public async Task<DefaultResponse> CreateAsync(ProductEntity entity)
        {
            string strQuery = @$"insert into product(id, name, productCode, productTypeId, categoryId, unityId, costPrice, percentage, price, active)
                                          Values('{entity.Id}', '{entity.Name}', '{entity.ProductCode}', '{entity.ProductTypeId}', '{entity.CategoryId}', '{entity.UnityId}', {entity.CostPrice}, {entity.Percentage}, {entity.Price}, {entity.Active})";

            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);

                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Produto criado com sucesso", false);
            }
            return new DefaultResponse("", "Erro ao tentar criar produto", true);
        }
        public async Task<DefaultResponse> UpdateAsync(ProductEntity entity)
        {
            string strQuery = $@"update product set name = '{entity.Name}', 
                                                    active = {entity.Active},
                                                    productCode = '{entity.ProductCode}', 
                                                    productTypeId = '{entity.ProductTypeId}',
                                                    categoryId = '{entity.CategoryId}',
                                                    unityId = '{entity.UnityId}', 
                                                    costPrice = {entity.CostPrice},
                                                    percentage = {entity.Percentage},
                                                    price = {entity.Price}
                                                    where id = '{entity.Id}'";

            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);

                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Produto alterado com sucesso", false);
            }

            return new DefaultResponse("", "Erro ao tentar alterada produto", true);
        }

        public async Task<DefaultResponse> DeleteAsync(Guid id)
        {
            string strQuery = $"delete from product where id = '{id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);
                if (result > 0)
                    return new DefaultResponse(id.ToString(), "Produto excluída com sucesso", false);
            }
            return new DefaultResponse("", "Erro ao tentar excluír produto", true);
        }

        public async Task<ProductEntity> GetProductByIdAsync(Guid id)
        {
            string strQuery = $"select id, name, productCode, productTypeId, categoryId, unityId, costPrice, percentage, price, active from product where id = '{id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryFirstOrDefaultAsync<ProductEntity>(strQuery);
                return result;
            }
        }

        public async Task<int> GetCountProductByDependenceAsync(string dependence, Guid id)
        {
            try
            {
                string strQuery = $"select count(1) as count from product where {dependence} = '{id}'";
                using (var cnx = _context.Connection())
                {
                    var result = await cnx.QueryFirstOrDefaultAsync<int>(strQuery);
                    return result;
                }
            }
            catch (Exception)
            {
                return 0;
            }

        }


        public async Task<ProductEntity> GetProductByNameAsync(string name)
        {
            string strQuery = $"select id, name, productCode, productTypeId, categoryId, unityId, costPrice, percentage, price, active from product where name = '{name}' limit 1";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryFirstOrDefaultAsync<ProductEntity>(strQuery);
                return result;
            }
        }

        public async Task<ProductEntity> GetProductByProductCodeAsync(string productCode)
        {
            string strQuery = $"select id, name, productCode, productTypeId, categoryId, unityId, costPrice, percentage, price, active from product where productCode = '{productCode}' limit 1";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryFirstOrDefaultAsync<ProductEntity>(strQuery);
                return result;
            }
        }

        public async Task<PaginationResponse<ProductEntity>> GetProductByFiltersync(ProductGetFilterRequest filter)
        {
            using (var cnx = _context.Connection())
            {
                var _sql = new StringBuilder("select * from product where 1=1");
                var where = new StringBuilder();

                if (!string.IsNullOrEmpty(filter.Name))
                    where.Append(" AND name like '%" + filter.Name + "%'");

                if (!string.IsNullOrEmpty(filter.ProductTypeId))
                    where.Append(" AND productTypeId = '" + filter.ProductTypeId + "'");

                if (!string.IsNullOrEmpty(filter.UnityId))
                    where.Append(" AND unityId = '" + filter.UnityId + "'");

                if (!string.IsNullOrEmpty(filter.CategoryId))
                    where.Append(" AND categoryId = '" + filter.CategoryId + "'");

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

                var result = await cnx.QueryAsync<ProductEntity>(_sql.ToString());
                var result2 = await cnx.QueryAsync<int>("select count(*) as count from product where 1=1 " + where.ToString());
                var totalRows = result2.FirstOrDefault();

                return new PaginationResponse<ProductEntity>
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

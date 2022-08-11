using System;
using System.Collections.Generic;
using System.Text;

namespace SysManager.Application.Contracts.Product.Request
{
    public class ProductPutRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ProductCode { get; set; }
        public string ProductTypeId { get; set; }
        public string CategoryId { get; set; }
        public string UnityId { get; set; }
        public decimal CostPrice { get; set; }
        public decimal Percentage { get; set; }
        public decimal Price { get; set; }
        public bool Active { get; set; }
    }
}

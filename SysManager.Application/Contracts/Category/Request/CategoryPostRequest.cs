using System;
using System.Collections.Generic;
using System.Text;

namespace SysManager.Application.Contracts.Category.Request
{
    public class CategoryPostRequest
    {
        public string Name { get; set; }
        public Guid ParentId { get; set; }
        public bool Active { get; set; }
    }
}

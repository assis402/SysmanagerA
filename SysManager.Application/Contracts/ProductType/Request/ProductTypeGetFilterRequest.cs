using System;
using System.Collections.Generic;
using System.Text;

namespace SysManager.Application.Contracts.ProductType.Request
{
    public class ProductTypeGetFilterRequest
    {
        public string Name { get; set; }
        public string Active { get; set; }

        /// <summary>
        /// Página da consulta
        /// </summary>
        public int page { get; set; }
        /// <summary>
        /// Página final da consulta
        /// </summary>
        public int pageSize { get; set; }

    }
}


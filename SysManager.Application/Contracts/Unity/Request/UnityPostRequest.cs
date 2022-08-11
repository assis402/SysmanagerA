using System;
using System.Collections.Generic;
using System.Text;

namespace SysManager.Application.Contracts.Unity.Request
{
    /// <summary>
    /// Classe responsável como "contrato" de requisição para receber novas unidades de medida.
    /// </summary>
    public class UnityPostRequest
    {
        public string Name { get; set; }
        public bool Active { get; set; }
    }
}

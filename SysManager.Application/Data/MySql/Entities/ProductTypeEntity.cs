using SysManager.Application.Contracts.ProductType.Request;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SysManager.Application.Data.MySql.Entities
{
    [Table("productType")]
    public class ProductTypeEntity
    {

        public ProductTypeEntity(ProductTypePostRequest unity)
        {
            this.Id = Guid.NewGuid();
            this.Name = unity.Name;
            this.Active = unity.Active;
        }

        public ProductTypeEntity(ProductTypePutRequest unity)
        {
            this.Id = unity.Id;
            this.Name = unity.Name;
            this.Active = unity.Active;
        }

        public ProductTypeEntity()
        {

        }

        [Key,DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("active")]
        public bool Active { get; set; }

    }
}

using SysManager.Application.Contracts.Category.Request;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace SysManager.Application.Data.MySql.Entities
{
    [Table("category")]
    public class CategoryEntity
    {

        public CategoryEntity(CategoryPostRequest category)
        {
            this.Id = Guid.NewGuid();
            this.Name = category.Name;
            this.ParentId = category.ParentId;
            this.Active = category.Active;
        }

        public CategoryEntity(CategoryPutRequest category)
        {
            this.Id = category.Id;
            this.Name = category.Name;
            this.ParentId = category.ParentId;
            this.Active = category.Active;
        }

        public CategoryEntity()
        {

        }

        [Key,DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("parentId")]
        public Guid ParentId { get; set; }

        [Column("active")]
        public bool Active { get; set; }

    }
}

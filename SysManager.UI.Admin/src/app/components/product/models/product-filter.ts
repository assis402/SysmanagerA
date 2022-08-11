export class ProductFilter {
    name: string;
    active: string;
    categoryId: string;
    unityId: string;
    productTypeId: string;    
    page:number;
    pagesize:number;
    itemsByPage:number=0;
   
    constructor(name: string, active: string, 
                categoryid: string, unityid: string, producttypeid: string,
                page:number, pagesize: number) {
        this.name = name;
        this.active = active;
        this.categoryId = categoryid;
        this.unityId = unityid;
        this.productTypeId = producttypeid;
        this.page = page;        
        this.pagesize = pagesize;
      }
}
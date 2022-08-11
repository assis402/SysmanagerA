import { ProductTypeView } from "./product-type-view";

export class ProductTypePost{
       name: string='';
       active:boolean=false;

       constructor(obj:ProductTypeView){
              this.name = obj.name;
              this.active = obj.active;
       }
}
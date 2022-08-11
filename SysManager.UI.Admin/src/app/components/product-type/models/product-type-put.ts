import { ProductTypeView } from "./product-type-view";

export class ProductTypePut{
    id: string='';
    name: string='';
    active:boolean=false;

    constructor(obj:ProductTypeView){
           this.id = obj.id;   
           this.name = obj.name;
           this.active = obj.active;
    }    
}
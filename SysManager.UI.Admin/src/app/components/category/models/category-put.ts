import { CategoryView } from "./category-view";

export class CategoryPut{
    id: string='';
    name: string='';
    active:boolean=false;

    constructor(obj:CategoryView){
           this.id = obj.id;   
           this.name = obj.name;
           this.active = obj.active;
    }    
}
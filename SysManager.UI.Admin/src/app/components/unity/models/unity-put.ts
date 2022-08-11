import { UnityView } from "./unity-view";

export class UnityPut{
    id: string='';
    name: string='';
    active:boolean=false;

    constructor(obj:UnityView){
           this.id = obj.id;   
           this.name = obj.name;
           this.active = obj.active;
    }    
}
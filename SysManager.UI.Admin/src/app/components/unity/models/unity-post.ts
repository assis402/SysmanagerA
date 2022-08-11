import { UnityView } from "./unity-view";

export class UnityPost{
       name: string='';
       active:boolean=false;

       constructor(obj:UnityView){
              this.name = obj.name;
              this.active = obj.active;
       }
}
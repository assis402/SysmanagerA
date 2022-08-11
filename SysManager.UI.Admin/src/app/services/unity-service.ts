import { Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { UnityView } from '../components/unity/models/unity-view';
import { ServiceBase} from '../service-base/service-base';

@Injectable()
export class UnityService extends ServiceBase<UnityView>{
    constructor(){
        super({
               endpoint: `${environment.url_api}unity`
              }
            )
    }
}
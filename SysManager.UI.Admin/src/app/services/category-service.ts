import { Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { CategoryView } from '../components/category/models/category-view';
import { ServiceBase} from '../service-base/service-base';

@Injectable()
export class CategoryService extends ServiceBase<CategoryView>{
    constructor(){
        super({
               endpoint: `${environment.url_api}category`
              }
            )
    }
}
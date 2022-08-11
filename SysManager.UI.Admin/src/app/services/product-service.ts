import { Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { ProductView } from '../components/product/models/product-view';
import { ServiceBase} from '../service-base/service-base';

@Injectable()
export class ProductService extends ServiceBase<ProductView>{
    constructor(){
        super({
               endpoint: `${environment.url_api}product`
              }
            )
    }
}
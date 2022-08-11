import {Routes} from '@angular/router'
import {ProductTypeViewComponent} from './models/product-type-view-component'
import {ProductTypeComponent} from './product-type.component'
import {ProductTypeMaintenanceComponent} from './product-type-maintenance/product-type-maintenance.component'

export const ProductTypeRoutes: Routes = [
  {
    path: '',
    component: ProductTypeViewComponent,
    children: [
               {
                   path: 'product-type',
                   component: ProductTypeComponent,
                   data: {name: 'Pesquisar categoria', title:'Pesquisar categoria'}
               },
               {
                   path: 'maintenance',
                   component: ProductTypeMaintenanceComponent,
                   data: {name: 'Inserir categoria', title:'Inserir categoria'}
               },
               {
                   path: 'maintenance/:id',
                   component: ProductTypeMaintenanceComponent,
                   data: {name: 'Alterar categoria', title:'Alterar categoria'}
               },                           
              ]
    }
];
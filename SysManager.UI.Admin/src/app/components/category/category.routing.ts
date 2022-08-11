import {Routes} from '@angular/router'
import {CategoryViewComponent} from './models/category-view-component'
import {CategoryComponent} from './category.component'
import {CategoryMaintenanceComponent} from './category-maintenance/category-maintenance.component'

export const CategoryRoutes: Routes = [
  {
    path: '',
    component: CategoryViewComponent,
    children: [
               {
                   path: 'category',
                   component: CategoryComponent,
                   data: {name: 'Pesquisar categoria', title:'Pesquisar categoria'}
               },
               {
                   path: 'maintenance',
                   component: CategoryMaintenanceComponent,
                   data: {name: 'Inserir categoria', title:'Inserir categoria'}
               },
               {
                   path: 'maintenance/:id',
                   component: CategoryMaintenanceComponent,
                   data: {name: 'Alterar categoria', title:'Alterar categoria'}
               },                           
              ]
    }
];
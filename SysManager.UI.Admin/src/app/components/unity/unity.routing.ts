import {Routes} from '@angular/router'
import {UnityViewComponent} from './models/unity-view-component'
import {UnityComponent} from './unity.component'
import {UnityMaintenanceComponent} from './unity-maintenance/unity-maintenance.component'

export const UnityRoutes: Routes = [
  {
    path: '',
    component: UnityViewComponent,
    children: [
               {
                   path: 'unity',
                   component: UnityComponent,
                   data: {name: 'Pesquisar unidade', title:'Pesquisar unidade'}
               },
               {
                   path: 'maintenance',
                   component: UnityMaintenanceComponent,
                   data: {name: 'Inserir unidade', title:'Inserir unidade'}
               },
               {
                   path: 'maintenance/:id',
                   component: UnityMaintenanceComponent,
                   data: {name: 'Alterar unidade', title:'Alterar unidade'}
               },                           
              ]
    }
];
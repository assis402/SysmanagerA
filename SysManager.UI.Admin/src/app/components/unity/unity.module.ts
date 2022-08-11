import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnityRoutes } from './unity.routing';

import {
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    PaginationModule,
    SharedModule,
    TableModule,
    ModalModule,
    ToastModule,
  } from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomPaginationModule } from '../pagination/custom-pagination.module';
import { Utils } from 'src/app/utils/utils';
import { CustomModalModule } from '../modal/custom-modal.module';
import { UnityComponent } from './unity.component';
import { UnityMaintenanceComponent } from './unity-maintenance/unity-maintenance.component';
import { UnityService } from '../../services/unity-service';
import { PagerService } from '../../services/page-service';
import { UnityViewComponent } from './models/unity-view-component';


@NgModule({
    imports:[
        RouterModule.forChild(UnityRoutes),
        CommonModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ButtonGroupModule,
        ButtonModule,
        SharedModule,
        CardModule,
        GridModule,
        ListGroupModule,
        DropdownModule,
        IconModule,
        TableModule,
        NgxSpinnerModule,
        PaginationModule,
        CustomPaginationModule,
        ModalModule,
        ToastModule,
        CustomModalModule
    ],
    providers:[
        UnityService,
        PagerService,
        Utils
    ],
    declarations:[
        UnityComponent,
        UnityMaintenanceComponent,
        UnityViewComponent
    ],
})
export class UnityModule {
}
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { ProductTypeMaintenanceComponent } from './product-type-maintenance/product-type-maintenance.component';
import { ProductTypeComponent } from './product-type.component';
import { ProductTypeRoutes } from './product-type.routing';
import { ProductTypeViewComponent } from './models/product-type-view-component';

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
import { ProductTypeService } from 'src/app/services/product-type-service';
import { PagerService } from 'src/app/services/page-service';
import { CustomPaginationModule } from '../pagination/custom-pagination.module';
import { Utils } from 'src/app/utils/utils';
import { CustomModalModule } from '../modal/custom-modal.module';


@NgModule({
    imports:[
        RouterModule.forChild(ProductTypeRoutes),
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
        ProductTypeService,
        PagerService,
        Utils
    ],
    declarations:[
        ProductTypeComponent,
        ProductTypeMaintenanceComponent,
        ProductTypeViewComponent
    ],
})
export class ProductTypeModule {
}
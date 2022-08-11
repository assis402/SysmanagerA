import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { CategoryMaintenanceComponent } from './category-maintenance/category-maintenance.component';
import { CategoryComponent } from './category.component';
import { CategoryRoutes } from './category.routing';
import { CategoryViewComponent } from './models/category-view-component';

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
import { CategoryService } from 'src/app/services/category-service';
import { PagerService } from 'src/app/services/page-service';
import { CustomPaginationModule } from '../pagination/custom-pagination.module';
import { Utils } from 'src/app/utils/utils';
import { CustomModalModule } from '../modal/custom-modal.module';


@NgModule({
    imports:[
        RouterModule.forChild(CategoryRoutes),
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
        CategoryService,
        PagerService,
        Utils
    ],
    declarations:[
        CategoryComponent,
        CategoryMaintenanceComponent,
        CategoryViewComponent
    ],
})
export class CategoryModule {
}
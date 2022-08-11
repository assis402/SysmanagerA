// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { ProductComponent } from './product.component';
import { ProductRoutes } from './product.routing';
import { ProductViewComponent } from './models/product-view-component';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  ModalModule,
  PaginationModule,
  SharedModule,
  TableModule,
  ToastModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ProductService } from '../../services/product-service';
import { PagerService } from '../../services/page-service';
import { CustomPaginationModule } from '../pagination/custom-pagination.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductTypeService } from 'src/app/services/product-type-service';
import { CategoryService } from 'src/app/services/category-service';
import { UnityService } from 'src/app/services/unity-service';
import { ProductMaintenanceComponent } from './product-maintenance/product-maintenance.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CustomModalModule } from '../modal/custom-modal.module';
import { Utils } from 'src/app/utils/utils';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProductRoutes),
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
    CurrencyMaskModule,
    ToastModule,
    CustomModalModule
    ],
  providers: [
    ProductService,
    ProductTypeService,
    CategoryService,
    UnityService,
    PagerService, Utils
  ],
  declarations: [
    ProductComponent,
    ProductMaintenanceComponent,
    ProductViewComponent,
  ]
})
export class ProductModule { }

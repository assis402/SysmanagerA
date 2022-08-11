import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductTypeService } from 'src/app/services/product-type-service';
import { ProductTypeView } from '../models/product-type-view';
import { ProductTypePost } from '../models/product-type-post';
import { ProductTypePut } from '../models/product-type-put';
import { Utils } from 'src/app/utils/utils';

@Component({
selector:'app-product-type-maintenance',
templateUrl:'./product-type-maintenance.component.html'
})

export class ProductTypeMaintenanceComponent implements OnInit {
    returnUrl: string ='/product-type/product-type';
    @Input() modalTitle = ''
    @Input() modalBodyDetail = ''
    action = 'Inserir';
    @Input() id: any = '';
    idDefault = Guid.EMPTY;

    public setModalVisible = false;
    productType = new ProductTypeView();
    constructor(private formBuilder: FormBuilder,
                private activedRouter: ActivatedRoute,
                private spinner: NgxSpinnerService,
                private productTypeService: ProductTypeService,
                private toastr: ToastrService,
                private utils: Utils
                ){}

    formProductType = new FormGroup({
                                   id: this.formBuilder.control(this.productType.id),
                                   name: this.formBuilder.control(this.productType.name),
                                   active: this.formBuilder.control(this.productType.active)
                                 });
                
    ngOnInit(){
        this.id = this.activedRouter.snapshot.params['id'];
        if (this.id != undefined && this.id != this.idDefault && this.id != null) {
          this.action = 'Alterar';
          this.getById(this.id);
        } else {
          this.action = 'Inserir';
          this.productType = new ProductTypeView();
          this.formProductType.patchValue(this.productType);
        }
    }

    getById(id: string) {
        this.spinner.show();
        this.productTypeService.getByID(id).subscribe(view => {
          this.productType = view;
          this.updateForm(this.productType);
          this.spinner.hide();
        }, error  => {
          this.utils.showErrorMessage(error,this.action)
          this.spinner.hide();
        });
      }

      updateForm(productType: ProductTypeView){
        this.formProductType = new FormGroup({
          id: this.formBuilder.control(productType.id),
          name: this.formBuilder.control(productType.name),
          active: this.formBuilder.control(productType.active),});  
      }

    confirmdelete(){
      if (this.productType.id !== undefined && this.productType.id != '')
      {
         this.spinner.show();
         this.productTypeService.delete(this.productType.id).subscribe((response: any) => {
              this.spinner.hide();
              this.utils.showSuccessMessage(response.message,this.action)
          }, error => {
              this.spinner.hide();
              this.utils.showErrorMessage(error,this.action);
          });
          this.setModalVisible = false;
          this.utils.navigateTo(this.returnUrl,'');
      }
    }

    canceldelete(){
        this.setModalVisible = false;
    }

    prepareDelete(){
      this.modalTitle = 'Excluir tipo de produto';
      this.modalBodyDetail = 'Deseja realmente excluir o registro ('+this.productType.name+') ?';
    }

    
    saveChanges(productType:any){
     if(this.productType.id === undefined || this.productType.id ==='') {
       this.insertProductType(productType);
     } else {
       this.updateProductType(productType);
     }
    }

    insertProductType(productType: ProductTypeView){
      const productTypePost = new ProductTypePost(productType);
      this.spinner.show();
      this.productTypeService.insert(productTypePost).subscribe((response: any) => {
           this.spinner.hide();
           this.utils.showSuccessMessage(response.message,this.action)
       }, error => {
           this.spinner.hide();
           this.utils.showErrorMessage(error,this.action); 
       });
    }
    
    updateProductType(productType: ProductTypeView){
      const productTypePut = new ProductTypePut(productType);
      this.spinner.show();
      this.productTypeService.update(productTypePut).subscribe((response: any) => {
           this.spinner.hide();
           this.utils.showSuccessMessage(response.message,this.action)
       }, error => {
           this.spinner.hide();
           this.utils.showErrorMessage(error,this.action);
       });
    }    
}
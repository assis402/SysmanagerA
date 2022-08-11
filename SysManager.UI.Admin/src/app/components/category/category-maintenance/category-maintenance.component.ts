import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category-service';
import { CategoryView } from '../models/category-view';
import { CategoryPost } from '../models/category-post';
import { CategoryPut } from '../models/category-put';
import { Utils } from 'src/app/utils/utils';

@Component({
selector:'app-category-maintenance',
templateUrl:'./category-maintenance.component.html'
})

export class CategoryMaintenanceComponent implements OnInit {
    returnUrl: string ='/category/category';
    @Input() modalBodyDetail = '';
    @Input() modalTitle = '';
    action = 'Inserir';
    @Input() id: any = '';
    idDefault = Guid.EMPTY;

    public setModalVisible = false;
    category = new CategoryView();
    constructor(private formBuilder: FormBuilder,
                private activedRouter: ActivatedRoute,
                private spinner: NgxSpinnerService,
                private categoryService: CategoryService,
                private utils: Utils
                ){}

    formCategory = new FormGroup({
                                   id: this.formBuilder.control(this.category.id),
                                   name: this.formBuilder.control(this.category.name),
                                   active: this.formBuilder.control(this.category.active)
                                 });
                
    ngOnInit(){
        this.id = this.activedRouter.snapshot.params['id'];
        if (this.id != undefined && this.id != this.idDefault && this.id != null) {
          this.action = 'Alterar';
          this.getById(this.id);
        } else {
          this.action = 'Inserir';
          this.category = new CategoryView();
          this.formCategory.patchValue(this.category);
        }
    }

    getById(id: string) {
        this.spinner.show();
        this.categoryService.getByID(id).subscribe(view => {
          this.category = view;
          this.updateForm(this.category);
          this.spinner.hide();
        }, error  => {
          this.utils.showErrorMessage(error,this.action);
          this.spinner.hide();
        });
      }

      updateForm(category: CategoryView){
        this.formCategory = new FormGroup({
          id: this.formBuilder.control(category.id),
          name: this.formBuilder.control(category.name),
          active: this.formBuilder.control(category.active),});  
      }

    confirmdelete(){
      if (this.category.id !== undefined && this.category.id != '')
      {
         this.spinner.show();
         this.categoryService.delete(this.category.id).subscribe((response: any) => {
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

      this.modalTitle = 'Excluir categoria';
      this.modalBodyDetail = 'Deseja realmente excluir o registro ('+this.category.name+') ?';
    }
    saveChanges(category:any){
     if(this.category.id === undefined || this.category.id ==='') {
       this.insertCategory(category);
     } else {
       this.updateCategory(category);
     }
    }

    insertCategory(category: CategoryView){
      const categoryPost = new CategoryPost(category);
      this.spinner.show();
      this.categoryService.insert(categoryPost).subscribe((response: any) => {
           this.spinner.hide();
           this.utils.showSuccessMessage(response.message,this.action)
       }, error => {
           this.spinner.hide();
           this.utils.showErrorMessage(error,this.action);
       });
    }
    
    updateCategory(category: CategoryView){
      const categoryPut = new CategoryPut(category);
      this.spinner.show();
      this.categoryService.update(categoryPut).subscribe((response: any) => {
           this.spinner.hide();
           this.utils.showSuccessMessage(response.message,this.action)
       }, error => {
           this.spinner.hide();
           this.utils.showErrorMessage(error,this.action);
       });
    }    

}
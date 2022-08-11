import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {CategoryFilter} from './models/category-filter'
import {CategoryService} from 'src/app/services/category-service'
import { NgxSpinnerService } from 'ngx-spinner';
import { PagerService } from 'src/app/services/page-service';
import { ToastrService } from 'ngx-toastr';
import { Utils } from 'src/app/utils/utils';

@Component({
selector:'app-category',
templateUrl:'./category.component.html'
})

export class CategoryComponent implements OnInit {

    returnUrl: string ='';
    @Input() modalBodyDetail = '';
    @Input() modalTitle = '';
    public setModalVisible = false;
    public deleteId = '';

    @Input() id: any ='';

    public pager: any = {};
    pagedItems: any[]=[];
    firstPage = 1;
    itemsByPage = 10;

    constructor(
                private formbuilder: FormBuilder,
                private categoryService: CategoryService,
                private spinner: NgxSpinnerService,
                private pagerService: PagerService,
                private utils: Utils
                ){

                }
                
    formFilter = new FormGroup({
                                name: this.formbuilder.control(''),
                                active: this.formbuilder.control('todos'),
                                itemsByPage: this.formbuilder.control('10'),
                               });

    ngOnInit(){

    }

    confirmdelete(){
        if (this.deleteId !== undefined && this.deleteId != '')
        {
           this.spinner.show();
           this.categoryService.delete(this.deleteId).subscribe((response: any) => {
                this.spinner.hide();
                this.utils.showSuccessMessage(response.message,'Categoria')
            }, error => {
                this.spinner.hide();
                this.utils.showErrorMessage(error,'Exclusão de Categoria');
            });
            this.deleteId == '';
            this.setModalVisible = false;
            this.filterView(this.formFilter.value,1);
        }
    }

    canceldelete() {
        this.setModalVisible = false;
    }

    prepareDelete(id:string, name:string) {
       this.deleteId = id;
       this.modalTitle = 'Exclusão de Categoria';
       this.modalBodyDetail = 'Deseja realmente excluir o registro ('+name+') ?';
       this.setModalVisible = !this.setModalVisible;
    }

    redirectUpdate(url:string, id:string) {
        this.utils.navigateTo(url,id);
    }

    redirectTo(url:string) {
        this.utils.navigateTo(url,'')
    }

    filterView(filter:CategoryFilter, page: number){

      let _filter = new CategoryFilter(filter.name, filter.active, page, filter.itemsByPage);
        this.spinner.show();
        this.categoryService.getByFilter(_filter).subscribe(view => 
            {
                this.pagedItems = view.items;
                this.pager = this.pagerService.getPager(view._total, page, view._pageSize);
                this.spinner.hide();
            }, error => {
                this.spinner.hide();
                this.utils.showErrorMessage(error,'Pesquisar');                
            });
    }

}
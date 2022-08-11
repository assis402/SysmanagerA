import { Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { PagerService } from '../../services/page-service';
import { ProductFilter } from './models/product-filter';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Utils } from 'src/app/utils/utils';
import { CategoryService } from 'src/app/services/category-service';
import { UnityService } from 'src/app/services/unity-service';
import { ProductTypeService } from 'src/app/services/product-type-service';
import { UnityFilter } from '../unity/models/unity-filter';
import { UnityView } from '../unity/models/unity-view';
import { ProductTypeFilter } from '../product-type/models/product-type-filter';
import { ProductTypeView } from '../product-type/models/product-type-view';
import { CategoryView } from '../category/models/category-view';
import { CategoryFilter } from '../category/models/category-filter';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  @Input() modalTitle = ''
  @Input() modalBodyDetail = ''
  public setModalVisible = false;
  returnUrl: string ='/product/product';
  public deleteId = '';
  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private categoryService: CategoryService,
              private unityService: UnityService,
              private productTypeService: ProductTypeService,
              private pagerService: PagerService,
              private spinner: NgxSpinnerService,
              private utils: Utils

              ) {

              }

  
  private allItems: any[]=[];
  public pager: any = {};
  
  listUnities: UnityView[]=[];
  listCategories: CategoryView[]=[];
  listTypes: ProductTypeView[]=[];

  ngOnInit(): void {
    this.InitializeDependecies();
  }


  formFilter = new  FormGroup(
    {
      name: this.formBuilder.control(''),
      active: this.formBuilder.control('todos'),
      categoryId: this.formBuilder.control(''),
      unityId: this.formBuilder.control(''),
      productTypeId: this.formBuilder.control(''),
      itemsByPage: this.formBuilder.control('10')
    }
  );

  totalItem: number=0;
  pagedItems: any[]=[];


  itemsByPage = 10;
  firstPage = 1;
  currentPage = 1;

filterView(filter: ProductFilter, page: number) {
  this.spinner.show();
  let eventFilter = new ProductFilter(filter.name, filter.active, filter.categoryId,filter.unityId,filter.productTypeId, page, this.itemsByPage);
  this.productService.getByFilter(eventFilter).subscribe(view => {
    this.allItems = view.items;
    this.totalItem = view._total;
    this.pager = this.pagerService.getPager(this.totalItem, page, view._pageSize);
    this.pagedItems = this.allItems;
    this.currentPage = page;
    this.spinner.hide();
  }, error => {
    this.utils.showErrorMessage(error,'Pesquisar');   
    console.log(error);    
    this.spinner.hide();
  });
}

redirectTo(url:string) {
  this.utils.navigateTo(url,'')
}

redirectUpdate(url: string, id: string) {
  this.utils.navigateTo(url,id)
}

confirmdelete(){

  if (this.deleteId !== undefined && this.deleteId != '')  {
     
    this.spinner.show();
     this.productService.delete(this.deleteId).subscribe((response: any) => {
          this.spinner.hide();
          this.utils.showSuccessMessage(response.message,'Sucesso')
      }, error => {
          this.spinner.hide();
          this.utils.showErrorMessage(error,'Erro');
      });
      this.setModalVisible = false;
      this.deleteId = '';
      this.filterView(this.formFilter.value,1);
  }

}

canceldelete(){
    this.setModalVisible = false;
    this.deleteId = '';
}

prepareDelete(id:string, name:string){

  this.deleteId = id;
  this.modalTitle = 'Excluir tipo de produto';
  this.modalBodyDetail = 'Deseja realmente excluir o registro ('+name+') ?';
  this.setModalVisible = true;
}


getUnities() {
  this.spinner.show();
  let eventFilter = new UnityFilter('','todos',0, 100);
  this.unityService.getByFilter(eventFilter)
    .subscribe(unityView => {
      this.spinner.hide();
      var view = new UnityView();
      unityView.items.unshift(view);
      this.listUnities = unityView.items;
    }, error => {
      this.utils.showErrorMessage(error,'Unidade');
      this.spinner.hide();
      console.log(error);
    });
}

getProdutcTypes() {
  this.spinner.show();
  let eventFilter = new ProductTypeFilter('','todos',0, 100);
  this.productTypeService.getByFilter(eventFilter)
    .subscribe(typesview => {
      this.spinner.hide();
      var view = new ProductTypeView();
      typesview.items.unshift(view);
      this.listTypes = typesview.items;
    }, error => {
      this.utils.showErrorMessage(error,'Tipo de produto');
      this.spinner.hide();
      console.log(error);
    });
}  

getCategories() {
  this.spinner.show();
  let eventFilter = new CategoryFilter('','todos',0, 100);
  this.categoryService.getByFilter(eventFilter)
    .subscribe(categoryView => {
      this.spinner.hide();
      var view = new CategoryView();
      categoryView.items.unshift(view);
      this.listCategories = categoryView.items;
    }, error => {
      this.utils.showErrorMessage(error,'Categoria');
      this.spinner.hide();
      console.log(error);
    });
}

InitializeDependecies() {
  this.getUnities();
  this.getCategories();
  this.getProdutcTypes();

}




}

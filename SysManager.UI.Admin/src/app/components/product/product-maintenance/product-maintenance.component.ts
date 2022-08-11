import { Component, OnInit, OnChanges, EventEmitter, Output, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductView } from '../models/product-view';
import { Observable } from 'rxjs';
import { ProductTypeView } from '../../product-type/models/product-type-view';

import { UnityView } from '../../unity/models/unity-view';
import { UnityFilter } from '../../unity/models/unity-filter';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UnityService } from 'src/app/services/unity-service';
import { ProductTypeFilter } from '../../product-type/models/product-type-filter';
import { ProductTypeService } from 'src/app/services/product-type-service';
import { ProductService } from 'src/app/services/product-service';
import { Guid } from 'guid-typescript';
import { CategoryService } from 'src/app/services/category-service';
import { ProductPost } from '../models/product-post';
import { ProductPut } from '../models/product-put';
import { CategoryView } from '../../category/models/category-view';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-product-maintenance',
  templateUrl: './product-maintenance.component.html'
})
export class ProductMaintenanceComponent implements OnInit {
  public modalVisible = false;
  formChanges!: Observable<any>;

  @Input() disableForm = true;
  @Input() urlReturn = '/product/product';
  @Input() product: ProductView = new ProductView();
  public setModalVisible = false;
  @Input() modalBodyDetail = '';
  @Input() modalTitle = '';
  @Input() id: any = '';  
  idDefault = Guid.EMPTY;

  pager: any = {};
  totalItem: number=0;
  pagedItems: any[]=[];
  itemsByPage = 10;
  firstPage = 1;
  currentPage = 1;
  setToDeleteProduct = '';
  isCollapsed: boolean = true;

  listUnities: UnityView[]=[];
  listCategories: CategoryView[]=[];
  listTypes: ProductTypeView[]=[];

  action = 'Inserir';

  formProduct = new FormGroup({
    id: this.formBuilder.control(this.product.id),
    name: this.formBuilder.control(this.product.name),
    productCode: this.formBuilder.control(this.product.productCode),
    productTypeId: this.formBuilder.control(this.product.productTypeId),
    unityId: this.formBuilder.control(this.product.unityId),      
    categoryId: this.formBuilder.control(this.product.categoryId),   

    costPrice: this.formBuilder.control(this.product.costPrice),
    percentage: this.formBuilder.control(this.product.percentage),
    price: this.formBuilder.control(this.product.price),

    active: this.formBuilder.control(this.product.active),

  });  

  constructor(private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private activedRouter: ActivatedRoute,
              private unityService: UnityService,
              private productTypeService: ProductTypeService,
              private productService: ProductService,
              private categoryService: CategoryService,
              private utils : Utils) {}
  
  ngOnInit() {
    this.id = this.activedRouter.snapshot.params['id'];

    if (this.id != undefined && this.id != this.idDefault && this.id != null) {
      this.action = 'Alterar';
      this.getById(this.id);
    } else {
      this.action = 'Inserir';
      this.product = new ProductView();
      this.formProduct.patchValue(this.product);
    }

    this.InitializeDependecies();

  }

  InitializeDependecies() {

    this.getUnities();
    this.getCategories();
    this.getProdutcTypes();

  }

  getById(id: string) {
    this.spinner.show();
    this.productService.getByID(id)
    .subscribe(view => {
      this.product = view;
      console.log('resposta do get...');
      console.log(JSON.stringify(this.product));
      this.updateForm(this.product);
      this.spinner.hide();
    }, error  => {
      this.utils.showErrorMessage(error,this.action);
      this.spinner.hide();
    });
  }

  saveChanges(product: any){
    if (this.product.id === undefined || this.product.id === '') 
       this.insertProduct(product);
    else 
       this.updateProduct(product);
  }

  updateForm(product: ProductView){
    this.formProduct = new FormGroup({
      id: this.formBuilder.control(product.id),
      name: this.formBuilder.control(product.name),
      productCode: this.formBuilder.control(this.product.productCode),
      productTypeId: this.formBuilder.control(this.product.productTypeId),
      unityId: this.formBuilder.control(this.product.unityId),
      costPrice: this.formBuilder.control(this.product.costPrice),
      percentage: this.formBuilder.control(this.product.percentage),
      price: this.formBuilder.control(this.product.price),
      categoryId: this.formBuilder.control(this.product.categoryId),      
      active: this.formBuilder.control(product.active),});  
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
    let eventFilter = new ProductTypeFilter('','todos',0, 100);
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


prepareDelete(){
  this.modalTitle = 'Exclusão de Produto'
  this.modalBodyDetail = 'Deseja realmente excluir o registro ('+ this.product.name+') ?';
  this.setModalVisible = true;
}

confirmdelete(){

    if (this.product.id !== undefined && this.product.id != '')
    {
       this.spinner.show();
       this.productTypeService.delete(this.product.id).subscribe((response: any) => {
            this.spinner.hide();
            this.utils.showSuccessMessage(response.message,this.action)
        }, error => {
            this.spinner.hide();
            this.utils.showErrorMessage(error,this.action);
        });
        this.setModalVisible = false;
        this.utils.navigateTo(this.urlReturn,'');
    }

}

canceldelete(){
    this.setToDeleteProduct = '';
    this.modalVisible = false;
}
 
calcPrice() {
    var _coast = this.formProduct.controls['costPrice'].value;
    var _percentage = this.formProduct.controls['percentage'].value;

    if ((_coast >0) || (_percentage > 0)) {
      var _calc = ((_coast * _percentage)/100);
      this.formProduct.controls['price'].setValue(_coast+_calc);
    }
  }

  redirect(url: string) {
    this.utils.navigateTo(url,'');
  }

  insertProduct(product: ProductView) {
    this.spinner.show();
    const productPost = new ProductPost(product);
    this.productService.insert(productPost).subscribe((response: any) =>
       {
        this.spinner.hide();
        this.utils.showSuccessMessage(response.message,this.action);
        this.redirect(this.urlReturn);        
       }, error => {
        this.utils.showErrorMessage(error,this.action);
        this.spinner.hide();
    });
  }

  updateProduct(product: ProductView) {
    this.spinner.show();
    const productPut = new ProductPut(product);
    this.productService.update(productPut).subscribe((response: any) =>  {
         this.spinner.hide();
         this.utils.showSuccessMessage(response.message,this.action);
       }, error => {
        this.utils.showErrorMessage(error,this.action);
         this.spinner.hide();
    });
  }

  deleteProduct(product: ProductView) {
    this.spinner.show();
    this.productService.delete(product.id).subscribe((response: any) => 
       {
        this.spinner.hide();
        this.utils.showSuccessMessage(response.message,this.action);
       }, error  => {
        this.utils.showErrorMessage(error,this.action);
        this.spinner.hide();
      });
      this.redirect(this.urlReturn);
  }
}

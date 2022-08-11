import { ProductView } from "./product-view";


export class ProductPut {
    id:string;
    name:string;
    productCode: string;
    productTypeId: string;
    categoryId: string;
    unityId: string;
    costPrice: number;
    percentage: number;
    price: number;    
    active: boolean;

  constructor(productView:ProductView) {
    this.id = productView.id;
    this.name = productView.name;
    this.productCode = productView.productCode;
    this.productTypeId = productView.productTypeId;
    this.categoryId = productView.categoryId;
    this.unityId = productView.unityId;
    this.costPrice = productView.costPrice;
    this.percentage = productView.percentage;
    this.price = productView.price;    
    this.active = productView.active;
  }

}

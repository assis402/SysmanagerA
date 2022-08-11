import { INavData } from '@coreui/angular';
import { IconComponent } from '@coreui/icons-angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name:'Modulos',
    title: true
  },
  {
    name:'Produto',
    url:'/product',
    iconComponent: {name:'cil-Inbox'},
    children: [
      {
        iconComponent: {name:'cil-Filter'},
        name:'Meus Produtos',
        url:'/product/product'
      },
      {
        iconComponent: {name:'cil-Spreadsheet'},
        name:'Novo Produtos',
        url:'/product/maintenance'
      },
    ]
  },
  {
    name:'Cadastros Auxiliares',
    title: true
  },
  {
    name:'Unidade de medida',
    url:'/unity',
    iconComponent: {name:'cil-Calculator'},
    children: [
      {
        iconComponent: {name:'cil-Filter'},
        name:'Minhas Unidades',
        url:'/unity/unity'
      },
      {
        iconComponent: {name:'cil-Spreadsheet'},
        name:'Nova Unidade',
        url:'/unity/maintenance'
      },
    ]
  },
  {
    name:'Tipo de produto',
    url:'/product-type',
    iconComponent: {name:'cilViewQuilt'},
    children: [
      {
        iconComponent: {name:'cil-Filter'},
        name:'Meus tipos',
        url:'/product-type/product-type'
      },
      {
        iconComponent: {name:'cil-Spreadsheet'},
        name:'Novo tipo',
        url:'/product-type/maintenance'
      },
    ]
  },  
  {
    name:'Categoria',
    url:'/category',
    iconComponent: {name:'cilClearAll'},
    children: [
      {
        iconComponent: {name:'cil-Filter'},
        name:'Minhas categorias',
        url:'/category/category'
      },
      {
        iconComponent: {name:'cil-Spreadsheet'},
        name:'Nova categoria',
        url:'/category/maintenance'
      },
    ]
  },
  {
    name:'Logout',
    title: true
  },
  {
    name: 'Sair',
    url: '/login',
    iconComponent: {name:'cil-AccountLogout'} 
  }

];

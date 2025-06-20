import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';

export const routes: Routes = [
    {
        path: "",
        component: ProductsComponent
    },
    {
        path:'addproduct',
        component: AddproductComponent
    }
];

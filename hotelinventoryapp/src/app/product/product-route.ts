import { Routes } from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { ProductCartComponent } from "./product-cart/product-cart.component";
import { ProductsResolveGuard } from "./guard/products-resolve.guard";



export const productsRoute: Routes = [
  { path: '', component: ProductsComponent,resolve:{products:ProductsResolveGuard} },
  { path: 'cart', component: ProductCartComponent }
];

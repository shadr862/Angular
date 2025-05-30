import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsResolveGuard implements Resolve<any> {

  constructor(private productService: ProductsService) {}

  resolve(): Observable<any> {
    return this.productService.Getproducts();
  }
}

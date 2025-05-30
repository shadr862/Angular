import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, pluck } from 'rxjs';

@Component({
  selector: 'hinv-products',
  standalone: true,  // <-- make it standalone
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']  // <-- fix typo from styleUrl to styleUrls
})
export class ProductsComponent implements OnInit {
  productsList: any;
  productsList$!: Observable<any>;//we have to define like this when we use async pipe

  constructor(private productService: ProductsService,
    private activatedRoute: ActivatedRoute) { 
     this.productsList$=this.activatedRoute.data.pipe(pluck('products'));
    
    }

  ngOnInit(): void {
     /*
    this.activatedRoute.data.pipe(pluck('products')).subscribe(products => {
      this.productsList = products;
    });
    */
    
    /*
    this.activatedRoute.data.subscribe(data => {
      this.productsList = data['products'];
      console.log('Resolved products:', this.productsList);
    });
    */

  }

  addToCart(product: any) {
    this.productService.addToCart(product);
  }
}






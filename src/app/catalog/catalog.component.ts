import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';

import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products: any;
  filter:string = '';
  
  constructor(
    private cartSvc: CartService, 
    private productSvc:ProductService,
    private router:Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
   this.productSvc.getProducts().subscribe(prods => {
    this.products = prods;    
   });
   this.route.queryParams.subscribe((params) => {
    this.filter = params['filter'] ?? '';
   })
}
  getFilteredProducts(){
    return this.filter === '' 
    ? this.products
    : this.products.filter((product:any) => product.category === this.filter);
  }


  getDiscountedClasses(product: IProduct) {
    if (product.discount > 0)
      return ['strikethrough'];
    else
      return [];
    }

    addToCart(product: IProduct){
      this.cartSvc.add(product);
      this.router.navigate(['/cart']);
    }

}


import { Component, inject, OnInit } from "@angular/core";
import { ProductService } from "../../Services/product.service";
import { ProductItem } from "../Product-Item/product-item.component";
import { Product } from "../../Models/Products.model";

@Component({
    standalone : true,
    selector : 'product-list',
    imports : [ProductItem],
    templateUrl : './product-list.component.html',
    styles : `
    .grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
    `,
})
export class ProductList implements OnInit {
    private productService = inject(ProductService);
    products = this.productService.productos;


    ngOnInit(){
        this.productService.loadProducts();
    }
    delete(id : number){
        this.productService.deleteProdcut(id);
    }
    update(p : any){
        this.productService.updateProduct(p);
    }
}
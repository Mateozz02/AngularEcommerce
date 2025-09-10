import { Component, inject, computed, signal, input, Input } from "@angular/core";
import { ProductService } from "../../Services/product.service";
import { ProductItem } from "../Product-Item/product-item.component";
import { Product } from "../../Models/products.model";
import { AuthService } from "../../Services/auth.service";

@Component({
  standalone: true,
  selector: 'product-list',
  imports: [ProductItem],
  templateUrl: './product-list.component.html',
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1rem;
    }
  `,
})
export class ProductList {
  private productService = inject(ProductService);
  private authService = inject(AuthService);

  products = this.productService.productos; // <- signal del servicio
  searchText = signal<string>(''); // <- también un signal
  
  
  // computed: se recalcula solo cuando cambia products() o searchText()
  filteredProducts = computed<Product[]>(() => {
    const query = this.searchText().toLowerCase();
    if (!query) return this.products();

    return this.products().filter(p =>
      p.title.toLowerCase().includes(query)
    );
  });

  constructor() {
    this.productService.loadProducts();
  }

  delete(id: number) {
    this.productService.deleteProdcut(id);
  }

  update(p: Product) {
    this.productService.updateProduct(p);
  }

  search(query: string) {
    this.searchText.set(query);
  }

  //AuthService
  auth : boolean = this.authService.isLoggedIn();
  message? : string;
  logout(){
    this.message = this.authService.logout();
      setTimeout(() => {
    window.location.reload();
  }, 1500);
  }
  
}

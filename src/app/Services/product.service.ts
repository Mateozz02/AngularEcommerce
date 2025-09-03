import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Product } from "../Models/products.model";




@Injectable({providedIn : "root"})
export class ProductService {
    private apiUrl = 'https://fakestoreapi.com/products';
    productos = signal<Product[]>([]);
    productoSeleccionado = signal<Product | null>(null);

    constructor(private http: HttpClient){}
    

    loadProducts(){
        this.http.get<Product[]>(this.apiUrl).subscribe({
            next: data =>this.productos.set(data),
            error(err) {
                console.log(err);
            },
        })
    }

    addProduct(product : Product){
        this.http.post<Product>(this.apiUrl,product).subscribe({
            next : newProduct => this.productos.update(list => [...list,newProduct])
        })
    }
    updateProduct(product : Product) {
        this.http.put<Product>(`${this.apiUrl}/${product.id}`,product).subscribe({
            next : updated => 
                this.productos.update(list => 
                    list.map(p => p.id === updated.id ? updated : p)
                )
        })
    }
    deleteProdcut(id : number) {
        this.http.delete(`${this.apiUrl}/${id}`).subscribe({
            next : () => this.productos.update(list=> list.filter(p => p.id !==id))
        })
    }
    loadSingleProduct(id : number){
        this.http.get<Product>(`${this.apiUrl}/${id}`).subscribe({
            next : data => this.productos.set([data]),
            error(err) {
                console.log(err);
            }
        })
    }
        // Método para buscar productos por título
        searchProducts(query: string): Product[] {
            const lowerQuery = query.toLowerCase();
            return this.productos().filter(product =>
                product.title.toLowerCase().includes(lowerQuery)
            );
        }
}
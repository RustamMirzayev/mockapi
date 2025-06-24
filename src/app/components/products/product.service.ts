import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.baseUrl;

  private productsSubject = new BehaviorSubject<any[]>([]);
  public products$ = this.productsSubject.asObservable();

  private _loading = new BehaviorSubject<boolean>(true);
  public loading$ = this._loading.asObservable();

  constructor(private http: HttpClient) {}

  getAllProducts(): void {
    this._loading.next(true);
    this.http.get<any[]>(this.baseUrl).subscribe((data) => {
      this.productsSubject.next(data);
      this._loading.next(false);
    });
  }

  addProducts(product: any): Observable<any> {
    return this.http.post(this.baseUrl, product);
  }

  addProductToList(newProduct: any) {
    const current = this.productsSubject.value;
    this.productsSubject.next([...current, newProduct]);
  }

  updateproduct(id: number, updatedproduct: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedproduct);
  }

  updateLocalProduct(updatedProduct: any) {
    const updatedList = this.productsSubject.value.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this.productsSubject.next(updatedList);
    this.updateproduct(updatedProduct.id, updatedProduct);
  }

  deleteProduct(id: number) {
    return this.http.delete(`https://fakestoreapi.com/products/${id}`);
  }

  removeProductFromList(id: number) {
    const updatedList = this.productsSubject.value.filter((p) => p.id !== id);
    this.productsSubject.next(updatedList);
    this.deleteProduct(id);
  }
}

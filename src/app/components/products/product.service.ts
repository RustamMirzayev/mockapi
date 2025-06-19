import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProductService{
    private baseUrl = 'https://fakestoreapi.com/products';

    constructor(private http:HttpClient){}

    getAllProducts():Observable<any>{
        return this.http.get(this.baseUrl)
    }

    addProducts(product:any):Observable<any>{
            return this.http.post(this.baseUrl,product)
    }
}
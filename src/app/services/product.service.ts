import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url : string = 'http://localhost:3000/products';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private api : HttpClient) { }

  public getAllProducts() : Observable<any> {
    return this.api.get(`${this.url}/`);
  }

  public createProduct(product : Product) : Observable<any> {
    return this.api.post(`${this.url}/`, product, this.httpOptions);
  }

  public deleteProduct(id : string) : Observable<any> {
    return this.api.delete(`${this.url}/${id}`, this.httpOptions);
  }

  public updateProduct(product : Product) : Observable<any> {
    return this.api.put(`${this.url}/${product.id}`, product, this.httpOptions);
  }

  public getCategories()  : Observable<any> {
    return this.api.get('http://localhost:3000/categories/');
  }
}

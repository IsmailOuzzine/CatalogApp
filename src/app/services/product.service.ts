import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products! : Array<Product>;

  constructor() {
    this.products = [
      {id: 1, name: "Pen", price: 1.5, promotion: true},
      {id: 2, name: "Book", price: 25, promotion: false},
      {id: 3, name: "Bag", price: 50, promotion: true},
      {id: 4, name: "Workbook", price: 7, promotion: false},
      {id: 5, name: "Agenda", price: 25, promotion: true},
      {id: 6, name: "Notebook", price: 20, promotion: false},
      {id: 7, name: "Corrector", price: 7, promotion: true},
      {id: 8, name: "Color pen", price: 10, promotion: false},
      {id: 9, name: "Hand bag", price: 35, promotion: true},
    ];
  }

  public getAllProducts() : Observable<Array<Product>> {
    let rnd = Math.random();
    if(rnd < 0.1)
      return throwError( () => new Error('Internet connection is off.'));
    else 
      return of(this.products);
  }

  public deleteProduct(id : number) : Observable<boolean> {
    this.products = this.products.filter(p => p.id != id);
    return of(true);
  }

  public togglePromo(id : number) : Observable<boolean> {
    let p : Product = this.products.find(e => e.id == id)!;
    p.promotion = !p.promotion;
    return of(true);
  }
}

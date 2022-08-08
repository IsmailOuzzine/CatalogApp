import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products! : Array<Product>;

  constructor() {
    // this.products = [
    //   {id: UUID.UUID(), name: "Pen", price: 1.5, promotion: true},
    //   {id: UUID.UUID(), name: "Book", price: 25, promotion: false},
    //   {id: UUID.UUID(), name: "Bag", price: 50, promotion: true},
    //   {id: UUID.UUID(), name: "Workbook", price: 7, promotion: false},
    //   {id: UUID.UUID(), name: "Agenda", price: 25, promotion: true},
    //   {id: UUID.UUID(), name: "Notebook", price: 20, promotion: false},
    //   {id: UUID.UUID(), name: "Corrector", price: 7, promotion: true},
    //   {id: UUID.UUID(), name: "Color pen", price: 10, promotion: false},
    //   {id: UUID.UUID(), name: "Hand bag", price: 35, promotion: true},
    // ];
  }

  public getAllProducts() : Observable<Array<Product>> {
    let rnd = Math.random();
    if(rnd < 0.1)
      return throwError( () => new Error('Internet connection is off.'));
    else 
      return of([...this.products]);
  }

  public deleteProduct(id : string) : Observable<boolean> {
    this.products = this.products.filter(p => p.id != id);
    return of(true);
  }

  public togglePromo(id : string) : Observable<boolean> {
    let p : Product = this.products.find(e => e.id == id)!;
    p.promotion = !p.promotion;
    return of(true);
  }

  public searchProduct(keyword : string) : Observable<Product[]> {
    let p_arr = this.products.filter(p => p.name.includes(keyword));
    return of(p_arr);
  }
}

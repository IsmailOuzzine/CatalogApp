import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Category } from '../model/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  private url : string = 'http://127.0.0.1:3000/categories';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private api : HttpClient) {}

  getAllFromAPI() : Observable<Category[]> {
    // traitement de connexion vers l'API
    console.log(`${this.url}/`);
    return this.api.get<Category[]> (this.url + '/');
  }

  deleteCategory(id : string) : Observable<any> {
    return this.api.delete(`${this.url}/${id}`, this.httpOptions);
  }

  addCategory(categ : Category) : Observable<any> {
    return this.api.post(`${this.url}/`, categ, this.httpOptions);
  }
  
  updateCategory(categ : Category) : Observable<any> {
    return this.api.put(`${this.url}/${categ.id}`, categ,  this.httpOptions);
  }
}

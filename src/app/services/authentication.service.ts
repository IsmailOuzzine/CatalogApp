import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url : string = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  authenticatedUser : User | undefined;

  constructor(private api : HttpClient) { }

  public login(email : string, password : string) : Observable<any> {
    return this.api.post(`${this.url}/auth`, {email, password}, this.httpOptions);
  }

  public register(user : User) : Observable<any> {
    return this.api.post(`${this.url}/`, user, this.httpOptions);
  }

  public authenticate(user : User) {
    this.authenticatedUser = user;
    localStorage.setItem("authUser", user.email);
  }

  public hasRole(role : string) {
    return this.authenticatedUser?.roles.includes(role);
  }

}

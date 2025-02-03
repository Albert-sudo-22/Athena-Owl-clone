import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://dummyjson.com/users';
  private apiProduct = 'https://dummyjson.com/products'

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  fetchProduct(): Observable<any> {
    return this.http.get(this.apiProduct);
  }

}

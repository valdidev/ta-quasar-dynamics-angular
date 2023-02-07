import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '@modules/dashboard/interfaces/user';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public usersList: User[] = [];
  private API_URL = environment.api;
  public page = 1;

  constructor(private httpClient: HttpClient) {}

  // http get users
  httpGetUsers(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/users?page=${this.page}`).pipe(
      map(({ data }: any) => {
        return data;
      }),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

  // http get user
  httpGetUserById(userId: number): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/users/${userId}`);
  }

  // http post user
  postUser(userBody: User): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/users`, userBody);
  }

  // http delete user
  deleteUserById(userId: number) {
    return this.httpClient.delete(`${this.API_URL}/users/${userId}`);
  }

  // simulating an id given by the api for create users feature
  generateID() {
    let number = Date.now();
    let id = number.toString().slice(-4);
    return parseInt(id);
  }
}

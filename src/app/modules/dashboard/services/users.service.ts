import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@shared/interfaces/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
// TODO: users harcoded
export class UsersService {
  public usersList: User[] = [
    {
      id: 7,
      email: 'michael.lawson@reqres.in',
      first_name: 'Michael',
      last_name: 'Lawson',
      avatar: 'https://reqres.in/img/faces/7-image.jpg',
    },
    {
      id: 8,
      email: 'lindsay.ferguson@reqres.in',
      first_name: 'Lindsay',
      last_name: 'Ferguson',
      avatar: 'https://reqres.in/img/faces/8-image.jpg',
    },
    {
      id: 9,
      email: 'tobias.funke@reqres.in',
      first_name: 'Tobias',
      last_name: 'Funke',
      avatar: 'https://reqres.in/img/faces/9-image.jpg',
    },
    {
      id: 10,
      email: 'byron.fields@reqres.in',
      first_name: 'Byron',
      last_name: 'Fields',
      avatar: 'https://reqres.in/img/faces/10-image.jpg',
    },
    {
      id: 11,
      email: 'george.edwards@reqres.in',
      first_name: 'George',
      last_name: 'Edwards',
      avatar: 'https://reqres.in/img/faces/11-image.jpg',
    },
    {
      id: 12,
      email: 'rachel.howell@reqres.in',
      first_name: 'Rachel',
      last_name: 'Howell',
      avatar: 'https://reqres.in/img/faces/12-image.jpg',
    },
  ];

  private API_URL = environment.api;

  public page = 1;

  constructor(private httpClient: HttpClient) {}

  // fake users
  getUsers() {
    return this.usersList;
  }

  // http get users
  httpGetUsers(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/users/?page${this.page}`);
  }

  httpGetUserById(userId: number): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/users/${userId}`);
  }

  postUser(userBody: User): Observable<any> {
    // mocking create
    this.usersList.unshift(userBody);

    // http create user
    return this.httpClient.post(`${this.API_URL}/users`, userBody);
  }

  deleteUserById(userId: number, userIndex: number) {
    // mocking delete
    this.usersList.splice(userIndex, 1);

    // http delete user
    console.log('http delete', userId);
    return this.httpClient.delete(`${this.API_URL}/users/${userId}`);
  }

  // simulating an id given by the api
  generateID() {
    let number = Date.now();
    let id = number.toString().slice(-4);
    return parseInt(id);
  }
}

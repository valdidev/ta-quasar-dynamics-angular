import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.api;

  constructor(private httpClient: HttpClient) {}

  httpPostLogin(crendentials: { email: string; password: string }): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/login`, crendentials)
  }

  httpPostRegister(crendentials: { email: string; password: string }): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/register`, crendentials)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  apiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient , private router: Router) {}
  // Request options
  // private getHeaders(): HttpHeaders {
  //   const headersConfig = {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   };
  //   return new HttpHeaders(headersConfig);
  // }

  get(path: string) : Observable<object> {
    return this.http.get(`${this.apiUrl}${path}`);
  }

  // post(path: string, body: object = {}) : Observable<object> {
  //   return this.http.post(`${this.apiUrl}${path}?${this.API_KEY}`, body, { headers: this.getHeaders() });
  // }

  redirectToNotFound() {
    this.router.navigate(['/404']);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  apiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient , private router: Router) {}

  get(path: string) : Observable<object> {
    return this.http.get(`${this.apiUrl}${path}`);
  }
}

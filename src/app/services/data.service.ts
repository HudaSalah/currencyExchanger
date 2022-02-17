import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private ApiService: ApiService) {}
}

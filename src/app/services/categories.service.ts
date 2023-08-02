// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../interfaces/category';
// import config from "./../../config"
import { DataService } from './data.service';
// import { categories } from "./../db.json"
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
//  private apiRoot = config.api.root
  constructor(
    // private httpClient: HttpClient,
    private data: DataService,
    ) {}

  getCategoriesFromServer(): Observable<Category[]> {
    // return this.httpClient.get<Category[]>(`${this.apiRoot}/categories`)
    return of(this.data.categories)
  }

 
}
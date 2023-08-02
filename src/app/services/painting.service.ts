// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Painting } from '../interfaces/paintings';
// import config from "./../../config"
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PaintingService {
  // private apiRoot = config.api.root
  constructor(
    private data: DataService,
    // private httpClient: HttpClient
  ) { }
  getPaintingsFromServer(): Observable<Painting[]> {
    // return this.httpClient.get<Painting[]>(`${this.apiRoot}/paintings?_limit=6`)
    return of(this.data.paintings)
  }
  getOnePaintingFromServer(paintingId: number): Observable<Painting> {
    // return this.httpClient.get<Painting>(`${this.apiRoot}/paintings/${paintingId}`)
    const index = this.data.paintings.findIndex(painting => paintingId === painting.id);
    return of(this.data.paintings[index])
  }
  getPaintingsForCategoryId(categoryId: number): Observable<Painting[]> {
    // return this.httpClient.get<Painting[]>(
    //   `${this.apiRoot}/paintings?category_like=${categoryId}`)
    return of(this.data.paintings.filter(painting => categoryId === painting.category)) 
  }

  getBestsellersFromServer(): Observable<Painting[]> {
    // return this.httpClient.get<Painting[]>(
    //   `${this.apiRoot}/paintings?popularity_like=bestsellers`)
    return of(this.data.paintings.filter(painting => painting.popularity.includes("bestsellers")))
  }

  getTopRankingFromServer(): Observable<Painting[]> {
    // return this.httpClient.get<Painting[]>(
    //   `${this.apiRoot}/paintings?popularity_like=top ranking`
    // )
    return of(this.data.paintings.filter(painting => painting.popularity.includes("top ranking")))
  }

  getMostPopularFromServer(): Observable<Painting[]> {
    // return this.httpClient.get<Painting[]>(
    //   `${this.apiRoot}/paintings?popularity_like=most popular`
    // )
    return of(this.data.paintings.filter(painting => painting.popularity.includes("most popular")))
  }

}
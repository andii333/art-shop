import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Review } from '../interfaces/review';
import config from "../../config"
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  // private apiRoot = config.api.root

  constructor(
    private data: DataService,
    private httpClient: HttpClient
  ) { }

  sendProductReviewToServer(review: Review): Observable<Review> {
    // return this.httpClient.post<Review>(`${this.apiRoot }/productReviews`, review, {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // })
    this.data.productReviews.push(review);
    return of(review)
  }

  getProductReviewsForPaintingId(id: number): Observable<Review[]> {
    // return this.httpClient.get<Review[]>(
    //   `${this.apiRoot}/productReviews?paintingId_like=${id}`
    // )
   return of(this.data.productReviews.filter(review => review.paintingId === id))
  }

  sendShopReviewToServer(review: Review): Observable<Review> {
    // return this.httpClient.post<Review>(`${this.apiRoot}/shopsReviews`, review, {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // })
    this.data.shopReviews.push(review);
    return of(review)
  }

  getShopsReviews(): Observable<Review[]> {
    // return this.httpClient.get<Review[]>(
    //   `${this.apiRoot}/shopsReviews`
    // )
    return of(this.data.shopReviews)
  }
}


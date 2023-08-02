// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { catchError, map, Observable, ReplaySubject, throwError } from 'rxjs';
// import { Painting } from '../interfaces/paintings';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  // private _listInBasket = new ReplaySubject<Painting[]>(1);
  // readonly productsFromBasket$: Observable<Painting[]> = this._listInBasket.asObservable();
  // readonly getNumberOfProducts$ = this._listInBasket.asObservable().pipe(map(paintings => { return paintings.length }));

  // constructor(private httpClient: HttpClient) {
    // this.getBasketFromServer();
  // }

  // getBasketFromServer(): Observable<Painting[]> {
  //  return this.httpClient.get<Painting[]>('http://localhost:3000/basket').pipe(
  //     catchError(error => {
  //       console.log('Error', error.message)
  //       return throwError(() => error)
  //     })
  //   )
  // }

  // addProductToBasketOnServer(painting: Painting): Observable<Painting[]> {
  //   return this.httpClient.post<Painting[]>('http://localhost:3000/basket', painting, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   })
  //     .pipe(
  //       catchError(error => {
  //         console.log(`Product was not sent to busket on server because the following error occurred: ${error.message}`)
  //         return throwError(() => error)
  //       })
  //     )
  // }

  // deleteOneProductFromBasket(id: number): void {
  //   this.httpClient.delete(`http://localhost:3000/basket/${id}`).subscribe()
  //   this.getBasketFromServer();
  //   this.getnamesOfProductsInBasket();
  // }

// getIdsOfProductsInBasket(): Observable < Set < number >> {
//   return this.productsFromBasket$.pipe(map(paintings => {
//     const setArray: Set<number> = new Set()
//     paintings.forEach(e => setArray.add(e.id))
//     return setArray
//   }))
// }

// getnamesOfProductsInBasket(): Observable < string > {
//   return this.productsFromBasket$.pipe(map(products => {
//     const emptyArray: string[] = [];
//     products.forEach(product => {
//       emptyArray.push(product.name);
//     })
//     let namesOfProductsInBasket = ''
//     if (emptyArray.length) {
//       namesOfProductsInBasket = (`In your basket are next products: ${emptyArray.join(', ')}`)
//     } else {
//       namesOfProductsInBasket = 'Basket is empty'
//     }
//     return namesOfProductsInBasket
//   }))
// }

// getSubtotalOfProductsInBasket(): Observable < number > {
//   return this.productsFromBasket$.pipe(map(products => {
//     const emptyArray: number[] = [];
//     products.forEach(product => {
//       emptyArray.push(product.price);
//     })
//     return emptyArray.reduce((a, b) => { return a + b }, 0)
//   }))
// }
} 

import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
//import {DISHES} from '../shared/dishes'

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

import { catchError } from 'rxjs/operators';







@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));
    }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error));
  }
}

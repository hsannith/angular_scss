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
import { Restangular } from 'ngx-restangular';







@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private restangular: Restangular,private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    return this.restangular.one('dishes', id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true})
    .pipe(map(dishes => dishes[0]));
    }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error));
  }
}

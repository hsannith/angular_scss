import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  featuredleader:Leader;

  constructor(private dishservice: DishService,private leaderservice :LeaderService,
    private promotionservice: PromotionService) { }

  ngOnInit() {
     this.dishservice.getFeaturedDish().subscribe(dish=>this.dish=dish);
     this.promotionservice.getFeaturedPromotion().subscribe(promotion=>this.promotion=promotion);
    this.leaderservice.getFeaturedLeader().subscribe(leader=>this.featuredleader=leader);
  }
}

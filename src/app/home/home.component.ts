import { Component, OnInit ,Inject} from '@angular/core';

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
  dishErrMess:string;
  promoErrMess:string;
  leaderErrMess:string;


  constructor(private dishservice: DishService,private leaderservice :LeaderService,
    private promotionservice: PromotionService,@Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe(dish => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess.message);
  this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
      errmess => this.promoErrMess = <any>errmess.message);
  this.leaderservice.getFeaturedLeader()
    .subscribe(leader => this.featuredleader = leader,
      errmess => this.leaderErrMess = <any>errmess.message); }
}

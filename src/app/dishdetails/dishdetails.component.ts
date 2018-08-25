import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';

import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchmap';



@Component({
  selector: 'app-dishdetails',
  templateUrl: './dishdetails.component.html',
  styleUrls: ['./dishdetails.component.css']
})
export class DishdetailsComponent implements OnInit {
  
  dish:Dish;
  dishIds :number[];
  prev :number;
  next:number;
  commentform: FormGroup;
  comment:Comment;

  formErrors = {
    'author': '',
    'rating' :5,
    'comment': ''
  
  };

  validationMessages = {
    'author': {
      'required':      'author Name is required.',
      'minlength':     'author Name must be at least 2 characters long.',
      'maxlength':     'author  Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'comment is required.'   
    }
  };


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,private fb:FormBuilder,@Inject('BaseURL') private BaseURL) { 
      this.createForm();
    }

  ngOnInit() {
    this.dishservice.getDishIds()
    .subscribe(dishIds=>this.dishIds=dishIds);
    this.route.params
    .switchMap((params:Params)=>this.dishservice.getDish(+params['id']))
   .subscribe(dish=>{this.dish=dish;this.setPrevNext(dish.id)});
  }


  createForm(){
    this.commentform=this.fb.group({
     author:['', [Validators.required, Validators.minLength(2) ]],
      rating:[5,[]],
      comment:['',[Validators.required]]

    }

    );
    this.commentform.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
    
    
  }

  onSubmit(){
    var d = new Date();
var n = d.toISOString();
console.log(n);
this.comment=this.commentform.value;
this.comment.date=n;
    this.dish.comments.push(this.comment);
    console.log(this.dish.comments);
    this.commentform.reset({
      author:'',
      rating:5,
      comment:''


    });
  }

  onValueChanged(data?: any) {
    if (!this.commentform) { return; }
    const form = this.commentform;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}

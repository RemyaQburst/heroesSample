import 'rxjs/add/operator/switchMap';
import { Component, OnInit,Input }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero }         from './hero';
import { HeroService }  from './hero.service';
// @Component({
//   selector: 'my-hero-detail',
//   template: `
//   <div *ngIf="hero">
//     <h2>{{hero.name}} details!</h2>
//     <div><label>id: </label>{{hero.id}}</div>
//     <div>
//       <label>name: </label>
//       <input [(ngModel)]="hero.name" placeholder="name"/>
//     </div>
//     <button (click)="goBack()">Back</button>
//   </div>`
// })
declare var module: {
   id: string;
}
@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
})
export class HeroDetailComponent implements OnInit {
  constructor(
  private heroService: HeroService,
  private route: ActivatedRoute,
  private location: Location
) {}
  @Input()
  	hero: Hero;
    ngOnInit(): void {
      this.route.params
        .switchMap((params: Params) => this.heroService.getHero(+params['id']))
        .subscribe(hero => this.hero = hero);
    }
    goBack(): void {
      this.location.back();
    }
}
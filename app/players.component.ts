import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router }            from '@angular/router';
import { Match }        from './match';
import { User }        from './user';

import './rxjs-extensions';


@Component({
  selector: 'players',
  template: `
  		<div class="col-lg-7 text-center">
					<div class="form-group">
						<input #searchBox type="text" (focus)="showMap = true" (keyup)="searchUsers(searchBox.value)" [(ngModel)]="newMatch._field.name"
							placeholder="Field" class="form-control" [ngModelOptions]="{standalone: true}">
						<ul class="list-group search-popup">
							<li (click)="newMatch._field = field" *ngFor="let field of fields" class="list-group-item">{{field.name}}</li>
						</ul>
					</div>
				</div>
				<div class="col-lg-5 text-center">
					<div class="row">
						<table class="table table-hover table-condensed">
							<thead>
								<tr>
									<th>Name</th>
									<th>Field</th>
									<th>Date</th>
									<th>Players</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								<tr *ngFor="let match of matchs" [class.selected]="match === selectedMatch" (click)="selectedMatch = match">
									<td>{{match.name}}</td>
									<td>{{match._field.name}}</td>
									<td>{{match.date | date:'short'}}</td>
									<td>{{match.users.length}}/{{2*match._field.size}}</td>
									<td>{{match.status}}</td>
								</tr>
							</tbody>
						</table>					</div>
					<div class="row">
					</div>
				</div>
  `,
  styleUrls: ['app/dashboard.component.css']
})

export class PlayersComponent implements OnInit {
	@Input()
	newMatch : Match = new Match();
	newMatchForm = false;
	showMap = true;
	users : [User];
	matchs : [Match];
	selectedMatch : Match = new Match();
	
  constructor(private router: Router, private http: Http) {}
 
  showMatchs(){
		this.showMap = true;
		this.newMatchForm = false;
		this.newMatch = new Match();
		this.http.post('/services', JSON.stringify({serviceId: "getMatchs", data:{}})).map((res: Response) => res.json()).subscribe(res => {
			this.matchs = res.data;
			if(this.matchs.length > 0)
				this.selectedMatch = this.matchs[0];
		}); 
  }
  
  searchUsers(user: string){
		this.http.post('/services', JSON.stringify({serviceId: "getUsers", data:{user:{email:user}}})).map((res: Response) => res.json()).subscribe(res => {
			this.users = res.data;
		});
  }
  
  addMatch(){	
		this.http.post('/services', JSON.stringify({serviceId: "addMatch", data:{match: this.newMatch}})).map((res: Response) => res.json()).subscribe(res => {
			this.showMatchs();
		}); 
  }
  
  ngOnInit(){
		this.showMatchs();
  }

}
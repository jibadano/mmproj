import { Component, OnInit, Input } from '@angular/core';
import { Match }        from './match';
import { Field }        from './field';
import { User }        from './user';
import { Pagination }        from './pagination';
import { AppService }		from './app.service'

import './rxjs-extensions';

@Component({
  selector: 'dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css'],
	providers:[AppService]
})

export class DashboardComponent implements OnInit {
	@Input() user:User;
	matchs : [Match];
	selectedMatch : Match = new Match();

	nav = 'allMatchs';
	pagination: Pagination = new Pagination();

  constructor(private services: AppService) {}

	menu(option : string){
		switch(option){
			case 'Add Match':{
				this.nav = 'newMatch';
			}
		}
	}

	searchMatch(m: Match){
		this.services.exec("getMatch",{matchName:m.name}).then( match =>{
			this.selectedMatch = match;
		});
	}

  showMatchs(){
		let matchsType = this.nav == 'myMatchs'? 'getMyMatchs' : 'getMatchs';

		this.services.exec(matchsType, {match:{},pagination: this.pagination})
		.then(matchs => {
			this.matchs = matchs;
			if(this.matchs.length > 0)
				this.selectedMatch = this.matchs[0];
		});
  }

	removeMatch(match : Match){
		this.services.exec("remMatch", {match:{name:match.name}})
		.then(() => this.showMatchs());
	}
  
  ngOnInit(){
		this.showMatchs();
  }



}
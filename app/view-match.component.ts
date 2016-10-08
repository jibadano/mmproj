import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { AppService }		from './app.service'
import { Match }        from './match';
import { Field }        from './field';
import { User }        from './user';

import './rxjs-extensions';

declare var $ : any;

@Component({
  selector: 'view-match',
  templateUrl: 'app/view-match.component.html',
  styleUrls: ['app/new-match.component.css']
})

export class ViewMatchComponent implements OnInit {
	
  constructor( private services: AppService) {}
 
  @Output() return = new EventEmitter<boolean>();
  
  @Input() match : Match = new Match();

  ngOnInit(){
		this.services.exec('getMatch',{matchName:this.match.name}).then(match => this.match = match);
  }

	confirm(){
			this.services.exec('confirmMatch',{match:this.match}).then();
	}

	decline(){
			this.services.exec('declineMatch',{match:this.match}).then();
	}

}
import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { AppService }		from './app.service'

import './rxjs-extensions';

@Component({
  selector: 'menu',
  templateUrl: 'app/menu.component.html',
	providers:[AppService]
})

export class MenuComponent implements OnInit {
	@Input() menuOptions:string[];
	@Output() optionSelected = new EventEmitter<string>();

  ngOnInit(){

  }



}
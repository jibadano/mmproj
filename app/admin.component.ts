import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { AppService }		from './app.service'

import { Match }        from './match';
import { Field }        from './field';
import { User }        from './user';

@Component({
  selector: 'admin',
  templateUrl: 'app/admin.component.html',
  styleUrls: ['app/admin.component.css']
})

export class AdminComponent implements OnInit {

	fields: Field[] = [];
	users: User[] = [];

	nav = 'home';
	newUser = new User();
	newField = new Field();
	
  constructor(private services: AppService) {}
 
 @Output() return = new EventEmitter<string>();
  ngOnInit(){
	this.newField.location = {lat:0,lng:0};
	this.services.exec('getFields',{fieldName:''}).then((fields)=>{
		this.fields = fields;
	});
	
	let u = {email:''};
	this.services.exec('getUsers',{user:u}).then((users)=>{
		this.users = users;
	});
  }

 addUser(){
	this.services.exec('addUser',{user:this.newUser});
		let u = {email:''};

	this.services.exec('getUsers',{user:u}).then((users)=>{
		this.users = users;
	});
  }

  addField(){
	this.services.exec('addField',{field:this.newField});
	this.services.exec('getFields',{fieldName:''}).then((fields)=>{
		this.fields = fields;
	});
  }

}
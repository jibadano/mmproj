import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { AppService }		from './app.service'

import { Match }        from './match';
import { Field }        from './field';
import { User }        from './user';

@Component({
  selector: 'groups',
  templateUrl: 'app/groups.component.html',
  styleUrls: ['app/new-match.component.css']
})

export class GroupsComponent implements OnInit {
	@Input() user : User;

	selectedGroup: {name: string, friends: User[]};
	users: [User];
	matchPlayers: User[] = [];
	selectedUser : User = new User();
	selectPlayers = false;
	userEmailSearch: string;

	lastUserSearch = "";
	
  constructor(private services: AppService) {}
 
 @Output() return = new EventEmitter<string>();

 addPlayer(player : User){
	this.selectedGroup.friends.push(player);
	this.selectedUser = new User();
	this.userEmailSearch = "";
	delete this.users;
 }

 removePlayer(player : any){
	let index = this.selectedGroup.friends.indexOf(player);
	if(index > -1)
		this.selectedGroup.friends.splice(index,1);
 }

 removeGroup(group : any){
	let index = this.user.groups.indexOf(group);
	if(index > -1)
		this.user.groups.splice(index,1);
 }

onKeyEventUser(event){
	if(event.keyCode=== 13 && (this.selectedUser.email && this.selectedUser.email != "")){
		this.addPlayer(this.selectedUser);
	}
	else
	if(event.keyCode === 40){
		if(this.users && this.users.length > 0){
			this.selectedUser = this.users[0];
			this.userEmailSearch = this.selectedUser.email;
			delete this.users;
		}
	}
}

   searchUsers(user: string){
	   if (this.lastUserSearch != user)
	   	if(user == "" ) 
	  		delete this.users;
		else
			this.services.exec('getUsers',{user: {email:user}}).then((users)=>{
				this.users = users;
				this.selectedGroup.friends.forEach(player => {
					let index = this.users.indexOf(player);
					if(index > -1)
						this.users.slice(index, 1);
				});
				this.lastUserSearch = user;
			});
  }
  
  addGroup(){
	  this.selectedGroup = {name:'New Group', friends: []};
	  this.user.groups.push(this.selectedGroup);
  }

  cancel(){
	  this.selectedGroup.name = 'New Group';
	  this.selectedGroup.friends = [];
	  this.selectedGroup = undefined;
  }
  
  save(){
	  this.user.groups.splice(this.user.groups.length-1,1);
	this.services.exec('updGroups',{groups: this.user.groups}).then(()=>this.return.emit('dashboard'));

	
  }


  ngOnInit(){
	  this.user = this.services.user;
	  	this.services.exec('getGroups',{}).then((groups)=>{
			  this.user.groups = groups;
			if(!this.user.groups)
				this.user.groups = [{name:'New Group', friends: []}];
			else
				this.user.groups.push({name:'New Group', friends: []});
	});

	 
  }

}
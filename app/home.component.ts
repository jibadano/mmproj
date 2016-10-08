import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { AppService }		from './app.service'
import { User }            from './user';

import './rxjs-extensions';

@Component({
  selector: 'home',
  template: `
		<div class="col-lg-4 col-lg-offset-4 text-center">
			<form role="form">
				<div class="form-group">
					<input type="email" [(ngModel)]="user.email" placeholder="Email" class="form-control" id="email" [ngModelOptions]="{standalone: true}">
				</div>
				<div class="form-group">
					<input type="password" [(ngModel)]="user.password" placeholder="Password" class="form-control" id="pwd" [ngModelOptions]="{standalone: true}">
				</div>
				<div class="checkbox">
					<label><input type="checkbox"> Remember me</label>
				</div>
				<button type="submit" (click)="login()" class="btn btn-default">Submit</button>
			</form>
		</div>
    `,
	providers:[AppService]
	})

export class HomeComponent implements OnInit {
	@Input()
	user : User = new User();
	
	@Output() loginSuccess = new EventEmitter<User>();

    constructor(private services: AppService) {};

  	login(){
		this.services.login(this.user).then(()=>this.loginSuccess.emit(this.user))
  	};
  
  	logout(){
		this.services.logout(); 
	}

  	ngOnInit(){
	  this.services.exec('getCurrentUser',{}).then(user =>{
		if(user) 
			this.loginSuccess.emit(user);
  	});
  }
  
}

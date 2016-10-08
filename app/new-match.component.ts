import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { AppService }		from './app.service'
import { Match }        from './match';
import { MatchStatus }        from './match';
import { CustomValidators } from 'ng2-validation';
import {
	FormBuilder,
	FormGroup,
	FORM_DIRECTIVES,
	REACTIVE_FORM_DIRECTIVES,
	Validators
} from '@angular/forms';
import { Field }        from './field';
import { User }        from './user';

declare var $ : any;

@Component({
  	selector: 'new-match',
  	templateUrl: 'app/new-match.component.html',
  	styleUrls: ['app/new-match.component.css'],
	directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class NewMatchComponent implements OnInit {
	@Input()
	set match(match: Match){
		this.services.exec('getMatch',{matchName:match.name}).then(match => this.newMatch = match);
	}
	newMatch : Match = new Match();
	fields : [Field];
	users: [User];
	matchPlayers: User[] = [];
	selectedUser : User = new User();
	fieldNameSearch: string;
	userEmailSearch: string;

	lastUserSearch = "";
	lastFieldSearch = "";

	adding = false;
	saving = false;

	formGroup :FormGroup;

	date: Date = new Date();
	time: Date = new Date();
	dateStr: string = '2015-12-12';
  constructor(private services: AppService, private fb: FormBuilder) {
  }
 
 @Output() return = new EventEmitter<boolean>();
  
 buildForm(): void {
    this.formGroup = this.fb.group({
      'name': [this.newMatch.name, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24)

       ]
      ],
	  'date': [this.date      ],
	  'time': [this.time      ],
	  'field': [this.newMatch._field.name, 
          Validators.required],
	  'players': [this.newMatch.players]
    });

    this.formGroup.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.formGroup) { return; }
    const form = this.formGroup;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

 formErrors = {
    'name': '',
    'date': '',
		'time': '',
    'field': '',
		'players': '',
  };

  validationMessages = {
    'name': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 4 characters long.',
      'maxlength':     'Name cannot be more than 24 characters long.',
      'email': 				 'Someone named "Bob" cannot be a hero.'
    },
    'date': {
      'required': 'Power is required.'
    },
	'field': {
      'required': 'Power is required.'
    }
  };

 addPlayer(player : User){
	this.newMatch.players.push({_user: Object.assign({},player), alter:false, admin:false, confirm:false});
	this.selectedUser = new User();
	this.userEmailSearch = "";
	delete this.users;
 }

 removePlayer(player : any){
	let index = this.newMatch.players.indexOf(player);
	if(index > -1)
		this.newMatch.players.splice(index,1);
 }

onKeyEventField(event){

	if(event.keyCode === 40){
		if(this.fields && this.fields.length > 0){
			this.newMatch._field = this.fields[0];
			this.fieldNameSearch = this.newMatch._field.name;
			delete this.fields;
		}
	}
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

  searchFields(field: string){
	  if( this.lastFieldSearch != field)
		if(field == "")
			delete this.fields;
		else
			this.services.exec("getFields", {fieldName: field}).then(fields =>{
				this.fields = fields;
				this.lastFieldSearch = field;
			});
  }

   searchUsers(user: string){
	   if (this.lastUserSearch != user)
	   	if(user == "" ) 
	  		delete this.users;
		else
			this.services.exec("getUsers", {user: {email:user}}).then(users =>{

				this.users = users.filter(user => this.newMatch.players.every(player => player._user._id !== user._id))
				this.lastUserSearch = user;
			});
  }

  removeExistingPlayer(userEmail: string){

  }
  
  addMatch(status : string){
	this.newMatch.status = status;
	this.onValueChanged();
	if(this.validForm()){
		console.log(this.date);
		console.log(this.time);
		this.date = new Date(this.date.toString());
		this.time = new Date(this.time.toString());
		this.newMatch.date = new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDay(),this.time.getHours(),this.time.getMinutes());
		this.services.exec("addMatch", {match: this.newMatch}).then(users =>{
			this.return.emit(users);
		});
	}
}
  

	validForm(){
		for (const field in this.formErrors) {
			let result = this.formErrors[field] != '';
				if(result)
					 return false;
		}
		return true;
	}
   
   ngOnInit(): void {
    this.buildForm();
  }

}
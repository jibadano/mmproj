import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { AppService }		from './app.service'
import { User }            from './user';
import { CustomValidators } from 'ng2-validation';
import {
	FormBuilder,
	FormGroup,
	FORM_DIRECTIVES,
	REACTIVE_FORM_DIRECTIVES,
	Validators
} from '@angular/forms';
import './rxjs-extensions';

@Component({
  selector: 'home',
  templateUrl:'app/home.component.html',
	providers:[AppService],
	directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class HomeComponent implements OnInit {
	nav : string = 'welcome';
	formGroup :FormGroup;

	@Input()
	user : User = new User();
	
	@Output() loginSuccess = new EventEmitter<User>();

    constructor(private services: AppService, private fb: FormBuilder) {};

  	login(){
		if(this.user.password != ''  && this.user.email != '')
			this.services.login(this.user).then(()=>this.loginSuccess.emit(this.user))
  	};
  
  	logout(){
		this.services.logout(); 
	}

  	ngOnInit(){
		      this.buildForm();

	  this.services.exec('getCurrentUser',{}).then(user =>{
		if(user) 
			this.loginSuccess.emit(user);
  	});
  }





  buildForm(): void {
    this.formGroup = this.fb.group({
      'email': [this.user.email, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24)
       ]
      ],
	'password': [this.user.password, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24)
       ]
      ]
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
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'minlength':     'Email must be at least 4 characters long.',
      'maxlength':     'Email cannot be more than 24 characters long.'
    },
    'password': {
      'required':      'password is required.',
      'minlength':     'password must be at least 4 characters long.',
      'maxlength':     'password cannot be more than 24 characters long.'
    }
  };
  
}

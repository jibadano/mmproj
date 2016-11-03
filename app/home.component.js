"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var app_service_1 = require('./app.service');
var user_1 = require('./user');
var forms_1 = require('@angular/forms');
require('./rxjs-extensions');
var HomeComponent = (function () {
    function HomeComponent(services, fb) {
        this.services = services;
        this.fb = fb;
        this.nav = 'welcome';
        this.user = new user_1.User();
        this.loginSuccess = new core_1.EventEmitter();
        this.formErrors = {
            'email': '',
            'password': ''
        };
        this.validationMessages = {
            'email': {
                'required': 'Email is required.',
                'minlength': 'Email must be at least 4 characters long.',
                'maxlength': 'Email cannot be more than 24 characters long.'
            },
            'password': {
                'required': 'password is required.',
                'minlength': 'password must be at least 4 characters long.',
                'maxlength': 'password cannot be more than 24 characters long.'
            }
        };
    }
    ;
    HomeComponent.prototype.login = function () {
        var _this = this;
        if (this.user.password != '' && this.user.email != '')
            this.services.login(this.user).then(function () { return _this.loginSuccess.emit(_this.user); });
    };
    ;
    HomeComponent.prototype.logout = function () {
        this.services.logout();
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.buildForm();
        this.services.exec('getCurrentUser', {}).then(function (user) {
            if (user)
                _this.loginSuccess.emit(user);
        });
    };
    HomeComponent.prototype.buildForm = function () {
        var _this = this;
        this.formGroup = this.fb.group({
            'email': [this.user.email, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(4),
                    forms_1.Validators.maxLength(24)
                ]
            ],
            'password': [this.user.password, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(4),
                    forms_1.Validators.maxLength(24)
                ]
            ]
        });
        this.formGroup.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    HomeComponent.prototype.onValueChanged = function (data) {
        if (!this.formGroup) {
            return;
        }
        var form = this.formGroup;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_1.User)
    ], HomeComponent.prototype, "user", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HomeComponent.prototype, "loginSuccess", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/home.component.html',
            providers: [app_service_1.AppService],
            directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, forms_1.FormBuilder])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map
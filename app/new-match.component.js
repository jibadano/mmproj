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
var match_1 = require('./match');
var forms_1 = require('@angular/forms');
var user_1 = require('./user');
var NewMatchComponent = (function () {
    function NewMatchComponent(services, fb) {
        this.services = services;
        this.fb = fb;
        this.newMatch = new match_1.Match();
        this.matchPlayers = [];
        this.selectedUser = new user_1.User();
        this.lastUserSearch = "";
        this.lastFieldSearch = "";
        this.adding = false;
        this.saving = false;
        this.date = new Date();
        this.time = new Date();
        this.dateStr = '2015-12-12';
        this.return = new core_1.EventEmitter();
        this.formErrors = {
            'name': '',
            'date': '',
            'time': '',
            'field': '',
            'players': '',
        };
        this.validationMessages = {
            'name': {
                'required': 'Name is required.',
                'minlength': 'Name must be at least 4 characters long.',
                'maxlength': 'Name cannot be more than 24 characters long.',
                'email': 'Someone named "Bob" cannot be a hero.'
            },
            'date': {
                'required': 'Power is required.'
            },
            'field': {
                'required': 'Power is required.'
            }
        };
    }
    Object.defineProperty(NewMatchComponent.prototype, "match", {
        set: function (match) {
            var _this = this;
            this.services.exec('getMatch', { matchName: match.name }).then(function (match) { return _this.newMatch = match; });
        },
        enumerable: true,
        configurable: true
    });
    NewMatchComponent.prototype.buildForm = function () {
        var _this = this;
        this.formGroup = this.fb.group({
            'name': [this.newMatch.name, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(4),
                    forms_1.Validators.maxLength(24)
                ]
            ],
            'date': [this.date],
            'time': [this.time],
            'field': [this.newMatch._field.name,
                forms_1.Validators.required],
            'players': [this.newMatch.players]
        });
        this.formGroup.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    NewMatchComponent.prototype.onValueChanged = function (data) {
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
    NewMatchComponent.prototype.addPlayer = function (player) {
        this.newMatch.players.push({ _user: Object.assign({}, player), alter: false, admin: false, confirm: false });
        this.selectedUser = new user_1.User();
        this.userEmailSearch = "";
        delete this.users;
    };
    NewMatchComponent.prototype.removePlayer = function (player) {
        var index = this.newMatch.players.indexOf(player);
        if (index > -1)
            this.newMatch.players.splice(index, 1);
    };
    NewMatchComponent.prototype.onKeyEventField = function (event) {
        if (event.keyCode === 40) {
            if (this.fields && this.fields.length > 0) {
                this.newMatch._field = this.fields[0];
                this.fieldNameSearch = this.newMatch._field.name;
                delete this.fields;
            }
        }
    };
    NewMatchComponent.prototype.onKeyEventUser = function (event) {
        if (event.keyCode === 13 && (this.selectedUser.email && this.selectedUser.email != "")) {
            this.addPlayer(this.selectedUser);
        }
        else if (event.keyCode === 40) {
            if (this.users && this.users.length > 0) {
                this.selectedUser = this.users[0];
                this.userEmailSearch = this.selectedUser.email;
                delete this.users;
            }
        }
    };
    NewMatchComponent.prototype.searchFields = function (field) {
        var _this = this;
        if (this.lastFieldSearch != field)
            if (field == "")
                delete this.fields;
            else
                this.services.exec("getFields", { fieldName: field }).then(function (fields) {
                    _this.fields = fields;
                    _this.lastFieldSearch = field;
                });
    };
    NewMatchComponent.prototype.searchUsers = function (user) {
        var _this = this;
        if (this.lastUserSearch != user)
            if (user == "")
                delete this.users;
            else
                this.services.exec("getUsers", { user: { email: user } }).then(function (users) {
                    _this.users = users.filter(function (user) { return _this.newMatch.players.every(function (player) { return player._user._id !== user._id; }); });
                    _this.lastUserSearch = user;
                });
    };
    NewMatchComponent.prototype.removeExistingPlayer = function (userEmail) {
    };
    NewMatchComponent.prototype.addMatch = function (status) {
        var _this = this;
        this.newMatch.status = status;
        this.onValueChanged();
        if (this.validForm()) {
            console.log(this.date);
            console.log(this.time);
            this.date = new Date(this.date.toString());
            this.time = new Date(this.time.toString());
            this.newMatch.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDay(), this.time.getHours(), this.time.getMinutes());
            this.services.exec("addMatch", { match: this.newMatch }).then(function (users) {
                _this.return.emit(users);
            });
        }
    };
    NewMatchComponent.prototype.validForm = function () {
        for (var field in this.formErrors) {
            var result = this.formErrors[field] != '';
            if (result)
                return false;
        }
        return true;
    };
    NewMatchComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', match_1.Match), 
        __metadata('design:paramtypes', [match_1.Match])
    ], NewMatchComponent.prototype, "match", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NewMatchComponent.prototype, "return", void 0);
    NewMatchComponent = __decorate([
        core_1.Component({
            selector: 'new-match',
            templateUrl: 'app/new-match.component.html',
            styleUrls: ['app/new-match.component.css'],
            directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, forms_1.FormBuilder])
    ], NewMatchComponent);
    return NewMatchComponent;
}());
exports.NewMatchComponent = NewMatchComponent;
//# sourceMappingURL=new-match.component.js.map
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
var field_1 = require('./field');
var user_1 = require('./user');
var AdminComponent = (function () {
    function AdminComponent(services) {
        this.services = services;
        this.fields = [];
        this.users = [];
        this.nav = 'home';
        this.newUser = new user_1.User();
        this.newField = new field_1.Field();
        this.return = new core_1.EventEmitter();
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.newField.location = { lat: 0, lng: 0 };
        this.services.exec('getFields', { fieldName: '' }).then(function (fields) {
            _this.fields = fields;
        });
        var u = { email: '' };
        this.services.exec('getUsers', { user: u }).then(function (users) {
            _this.users = users;
        });
    };
    AdminComponent.prototype.addUser = function () {
        var _this = this;
        this.services.exec('addUser', { user: this.newUser });
        var u = { email: '' };
        this.services.exec('getUsers', { user: u }).then(function (users) {
            _this.users = users;
        });
    };
    AdminComponent.prototype.addField = function () {
        var _this = this;
        this.services.exec('addField', { field: this.newField });
        this.services.exec('getFields', { fieldName: '' }).then(function (fields) {
            _this.fields = fields;
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AdminComponent.prototype, "return", void 0);
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'admin',
            templateUrl: 'app/admin.component.html',
            styleUrls: ['app/admin.component.css']
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map
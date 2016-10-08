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
require('./rxjs-extensions');
var UserSessionComponent = (function () {
    function UserSessionComponent(services) {
        this.services = services;
        this.return = new core_1.EventEmitter();
        this.logOut = new core_1.EventEmitter();
        this.showMenu = false;
    }
    UserSessionComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserSessionComponent.prototype, "return", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserSessionComponent.prototype, "logOut", void 0);
    UserSessionComponent = __decorate([
        core_1.Component({
            selector: 'user-session',
            template: "\n        <div *ngIf=\"services.user\" class=\"btn-group\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"showMenu = !showMenu\" ><i class=\"fa fa-user\"></i>  {{services.user.email}}</button>\n            <button *ngIf=\"showMenu\" (click)=\"return.emit('groups');showMenu = false\" type=\"button\" class=\"btn btn-primary\" ><i class=\"fa fa-users\"></i></button>\n            <button *ngIf=\"showMenu\" (click)=\"return.emit('config');showMenu = false\" type=\"button\" class=\"btn btn-primary\" ><i class=\"fa fa-gear\"></i></button>\n            <button *ngIf=\"showMenu\" (click)=\"return.emit('help');showMenu = false\" type=\"button\" class=\"btn btn-primary\" ><i class=\"fa fa-question\"></i></button>\n            <button type=\"button\" (click)=\"logOut.emit();showMenu = false\" class=\"btn btn-primary\" ><i class=\"fa fa-power-off\"></i></button>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], UserSessionComponent);
    return UserSessionComponent;
}());
exports.UserSessionComponent = UserSessionComponent;
//# sourceMappingURL=user-session.component.js.map
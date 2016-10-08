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
require('./rxjs-extensions');
var HomeComponent = (function () {
    function HomeComponent(services) {
        this.services = services;
        this.user = new user_1.User();
        this.loginSuccess = new core_1.EventEmitter();
    }
    ;
    HomeComponent.prototype.login = function () {
        var _this = this;
        this.services.login(this.user).then(function () { return _this.loginSuccess.emit(_this.user); });
    };
    ;
    HomeComponent.prototype.logout = function () {
        this.services.logout();
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.services.exec('getCurrentUser', {}).then(function (user) {
            if (user)
                _this.loginSuccess.emit(user);
        });
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
            template: "\n\t\t<div class=\"col-lg-4 col-lg-offset-4 text-center\">\n\t\t\t<form role=\"form\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"email\" [(ngModel)]=\"user.email\" placeholder=\"Email\" class=\"form-control\" id=\"email\" [ngModelOptions]=\"{standalone: true}\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"password\" [(ngModel)]=\"user.password\" placeholder=\"Password\" class=\"form-control\" id=\"pwd\" [ngModelOptions]=\"{standalone: true}\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t<label><input type=\"checkbox\"> Remember me</label>\n\t\t\t\t</div>\n\t\t\t\t<button type=\"submit\" (click)=\"login()\" class=\"btn btn-default\">Submit</button>\n\t\t\t</form>\n\t\t</div>\n    ",
            providers: [app_service_1.AppService]
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map
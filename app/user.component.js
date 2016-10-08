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
var user_1 = require('./user');
require('./rxjs-extensions');
var HeaderMenuComponent = (function () {
    function HeaderMenuComponent() {
        this._user = new user_1.User();
    }
    HeaderMenuComponent.prototype.setUser = function (user) {
        this._user = user;
    };
    Object.defineProperty(HeaderMenuComponent.prototype, "user", {
        set: function (user) {
            this._user = user;
        },
        enumerable: true,
        configurable: true
    });
    HeaderMenuComponent.prototype.ngOnInit = function () {
        this._user.email = '';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_1.User), 
        __metadata('design:paramtypes', [user_1.User])
    ], HeaderMenuComponent.prototype, "user", null);
    HeaderMenuComponent = __decorate([
        core_1.Component({
            selector: 'header-menu',
            template: "\n\n\t<nav id=\"mainNav\" class=\"navbar navbar-default navbar-fixed-top\">\n        <div class=\"container-fluid\">\n            <div class=\"navbar-header\">\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n                    <span class=\"sr-only\">Toggle navigation</span> Menu <i class=\"fa fa-bars\"></i>\n                </button>\n                <a class=\"navbar-brand page-scroll\" href=\"#page-top\">Start Bootstrap</a>\n            </div>\n            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\" style=\"float: right;position: relative;top: 9px;\">\n               <div class=\"btn-group\">\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\">{{_user.email}}</button>\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-power-off\"></i></button>\n\t\t\t\t\t\t\t</div>\n            </div>\n        </div>\n    </nav>\n   \t\n    "
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], HeaderMenuComponent);
    return HeaderMenuComponent;
}());
exports.HeaderMenuComponent = HeaderMenuComponent;
//# sourceMappingURL=user.component.js.map
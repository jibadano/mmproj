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
var match_1 = require('./match');
var user_1 = require('./user');
var pagination_1 = require('./pagination');
var app_service_1 = require('./app.service');
require('./rxjs-extensions');
var DashboardComponent = (function () {
    function DashboardComponent(services) {
        this.services = services;
        this.selectedMatch = new match_1.Match();
        this.nav = 'allMatchs';
        this.pagination = new pagination_1.Pagination();
    }
    DashboardComponent.prototype.showMatchs = function () {
        var _this = this;
        var matchsType = this.nav == 'myMatchs' ? 'getMyMatchs' : 'getMatchs';
        this.services.exec(matchsType, { match: {}, pagination: this.pagination })
            .then(function (matchs) {
            _this.matchs = matchs;
            if (_this.matchs.length > 0)
                _this.selectedMatch = _this.matchs[0];
        });
    };
    DashboardComponent.prototype.removeMatch = function (match) {
        var _this = this;
        this.services.exec("remMatch", { match: { name: match.name } })
            .then(function () { return _this.showMatchs(); });
    };
    DashboardComponent.prototype.ngOnInit = function () {
        this.showMatchs();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_1.User)
    ], DashboardComponent.prototype, "user", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: 'app/dashboard.component.html',
            styleUrls: ['app/dashboard.component.css'],
            providers: [app_service_1.AppService]
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map
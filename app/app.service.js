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
var http_1 = require('@angular/http');
var user_1 = require('./user');
require('./rxjs-extensions');
var AppService = (function () {
    function AppService(http) {
        this.http = http;
        this.user = new user_1.User();
    }
    ;
    AppService.prototype.exec = function (serviceId, data) {
        return this.http.post('/services', JSON.stringify({ serviceId: serviceId, data: data }))
            .toPromise()
            .then(function (res) { return res.json().data; });
    };
    AppService.prototype.login = function (user) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(user.email + ':' + user.password) });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('/login', '', options)
            .toPromise()
            .then(function (res) { _this.user = res.json(); res.json(); });
    };
    ;
    AppService.prototype.logout = function () {
        var _this = this;
        this.http.post('/logout', '').toPromise().then(function (res) {
            _this.user = new user_1.User();
        });
    };
    AppService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map
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
require('./rxjs-extensions');
var ViewMatchComponent = (function () {
    function ViewMatchComponent(services) {
        this.services = services;
        this.return = new core_1.EventEmitter();
        this.match = new match_1.Match();
    }
    ViewMatchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.services.exec('getMatch', { matchName: this.match.name }).then(function (match) { return _this.match = match; });
    };
    ViewMatchComponent.prototype.confirm = function () {
        this.services.exec('confirmMatch', { match: this.match }).then();
    };
    ViewMatchComponent.prototype.decline = function () {
        this.services.exec('declineMatch', { match: this.match }).then();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ViewMatchComponent.prototype, "return", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', match_1.Match)
    ], ViewMatchComponent.prototype, "match", void 0);
    ViewMatchComponent = __decorate([
        core_1.Component({
            selector: 'view-match',
            templateUrl: 'app/view-match.component.html',
            styleUrls: ['app/new-match.component.css']
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], ViewMatchComponent);
    return ViewMatchComponent;
}());
exports.ViewMatchComponent = ViewMatchComponent;
//# sourceMappingURL=view-match.component.js.map
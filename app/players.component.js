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
var router_1 = require('@angular/router');
var match_1 = require('./match');
require('./rxjs-extensions');
var PlayersComponent = (function () {
    function PlayersComponent(router, http) {
        this.router = router;
        this.http = http;
        this.newMatch = new match_1.Match();
        this.newMatchForm = false;
        this.showMap = true;
        this.selectedMatch = new match_1.Match();
    }
    PlayersComponent.prototype.showMatchs = function () {
        var _this = this;
        this.showMap = true;
        this.newMatchForm = false;
        this.newMatch = new match_1.Match();
        this.http.post('/services', JSON.stringify({ serviceId: "getMatchs", data: {} })).map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.matchs = res.data;
            if (_this.matchs.length > 0)
                _this.selectedMatch = _this.matchs[0];
        });
    };
    PlayersComponent.prototype.searchUsers = function (user) {
        var _this = this;
        this.http.post('/services', JSON.stringify({ serviceId: "getUsers", data: { user: { email: user } } })).map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.users = res.data;
        });
    };
    PlayersComponent.prototype.addMatch = function () {
        var _this = this;
        this.http.post('/services', JSON.stringify({ serviceId: "addMatch", data: { match: this.newMatch } })).map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.showMatchs();
        });
    };
    PlayersComponent.prototype.ngOnInit = function () {
        this.showMatchs();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', match_1.Match)
    ], PlayersComponent.prototype, "newMatch", void 0);
    PlayersComponent = __decorate([
        core_1.Component({
            selector: 'players',
            template: "\n  \t\t<div class=\"col-lg-7 text-center\">\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<input #searchBox type=\"text\" (focus)=\"showMap = true\" (keyup)=\"searchUsers(searchBox.value)\" [(ngModel)]=\"newMatch._field.name\"\n\t\t\t\t\t\t\tplaceholder=\"Field\" class=\"form-control\" [ngModelOptions]=\"{standalone: true}\">\n\t\t\t\t\t\t<ul class=\"list-group search-popup\">\n\t\t\t\t\t\t\t<li (click)=\"newMatch._field = field\" *ngFor=\"let field of fields\" class=\"list-group-item\">{{field.name}}</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-lg-5 text-center\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<table class=\"table table-hover table-condensed\">\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t\t\t\t\t<th>Field</th>\n\t\t\t\t\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t\t\t\t\t<th>Players</th>\n\t\t\t\t\t\t\t\t\t<th>Status</th>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr *ngFor=\"let match of matchs\" [class.selected]=\"match === selectedMatch\" (click)=\"selectedMatch = match\">\n\t\t\t\t\t\t\t\t\t<td>{{match.name}}</td>\n\t\t\t\t\t\t\t\t\t<td>{{match._field.name}}</td>\n\t\t\t\t\t\t\t\t\t<td>{{match.date | date:'short'}}</td>\n\t\t\t\t\t\t\t\t\t<td>{{match.users.length}}/{{2*match._field.size}}</td>\n\t\t\t\t\t\t\t\t\t<td>{{match.status}}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n  ",
            styleUrls: ['app/dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http])
    ], PlayersComponent);
    return PlayersComponent;
}());
exports.PlayersComponent = PlayersComponent;
//# sourceMappingURL=players.component.js.map
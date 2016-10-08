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
var GroupsComponent = (function () {
    function GroupsComponent(services) {
        this.services = services;
        this.matchPlayers = [];
        this.selectedUser = new user_1.User();
        this.selectPlayers = false;
        this.lastUserSearch = "";
        this.return = new core_1.EventEmitter();
    }
    GroupsComponent.prototype.addPlayer = function (player) {
        this.selectedGroup.friends.push(player);
        this.selectedUser = new user_1.User();
        this.userEmailSearch = "";
        delete this.users;
    };
    GroupsComponent.prototype.removePlayer = function (player) {
        var index = this.selectedGroup.friends.indexOf(player);
        if (index > -1)
            this.selectedGroup.friends.splice(index, 1);
    };
    GroupsComponent.prototype.removeGroup = function (group) {
        var index = this.user.groups.indexOf(group);
        if (index > -1)
            this.user.groups.splice(index, 1);
    };
    GroupsComponent.prototype.onKeyEventUser = function (event) {
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
    GroupsComponent.prototype.searchUsers = function (user) {
        var _this = this;
        if (this.lastUserSearch != user)
            if (user == "")
                delete this.users;
            else
                this.services.exec('getUsers', { user: { email: user } }).then(function (users) {
                    _this.users = users;
                    _this.selectedGroup.friends.forEach(function (player) {
                        var index = _this.users.indexOf(player);
                        if (index > -1)
                            _this.users.slice(index, 1);
                    });
                    _this.lastUserSearch = user;
                });
    };
    GroupsComponent.prototype.addGroup = function () {
        this.selectedGroup = { name: 'New Group', friends: [] };
        this.user.groups.push(this.selectedGroup);
    };
    GroupsComponent.prototype.cancel = function () {
        this.selectedGroup.name = 'New Group';
        this.selectedGroup.friends = [];
        this.selectedGroup = undefined;
    };
    GroupsComponent.prototype.save = function () {
        var _this = this;
        this.user.groups.splice(this.user.groups.length - 1, 1);
        this.services.exec('updGroups', { groups: this.user.groups }).then(function () { return _this.return.emit('dashboard'); });
    };
    GroupsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.services.user;
        this.services.exec('getGroups', {}).then(function (groups) {
            _this.user.groups = groups;
            if (!_this.user.groups)
                _this.user.groups = [{ name: 'New Group', friends: [] }];
            else
                _this.user.groups.push({ name: 'New Group', friends: [] });
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_1.User)
    ], GroupsComponent.prototype, "user", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GroupsComponent.prototype, "return", void 0);
    GroupsComponent = __decorate([
        core_1.Component({
            selector: 'groups',
            templateUrl: 'app/groups.component.html',
            styleUrls: ['app/new-match.component.css']
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], GroupsComponent);
    return GroupsComponent;
}());
exports.GroupsComponent = GroupsComponent;
//# sourceMappingURL=groups.component.js.map
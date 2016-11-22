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
var field_1 = require('./field');
require('./rxjs-extensions');
var MapComponent = (function () {
    function MapComponent() {
    }
    Object.defineProperty(MapComponent.prototype, "field", {
        set: function (field) {
            this._field = field;
            if (this._field.location) {
                var latlng = new google.maps.LatLng(this._field.location.lat, this._field.location.lng);
                this.map = new google.maps.Map(document.getElementById("googleMap"), {
                    center: latlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                this.marker = new google.maps.Marker({
                    position: latlng,
                    title: this._field.name
                });
                this.marker.setMap(this.map);
            }
        },
        enumerable: true,
        configurable: true
    });
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            _this.map = new google.maps.Map(document.getElementById("googleMap"), {
                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            _this.marker = new google.maps.Marker({
                position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                title: ''
            });
            _this.marker.setMap(_this.map);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', field_1.Field), 
        __metadata('design:paramtypes', [field_1.Field])
    ], MapComponent.prototype, "field", null);
    MapComponent = __decorate([
        core_1.Component({
            selector: 'map',
            template: '<div id="googleMap" style="width:100%;height:120px;margin-bottom:40px"></div>',
            styleUrls: []
        }), 
        __metadata('design:paramtypes', [])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map
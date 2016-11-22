import { Component, OnInit ,Input} from '@angular/core';
import { Match }        from './match';
import { Field }        from './field';

import './rxjs-extensions';

declare var google: any;


@Component({
  selector: 'map',
  template: '<div id="googleMap" style="width:100%;height:120px;margin-bottom:40px"></div>',
  styleUrls: []
})

export class MapComponent implements OnInit{

	_field: Field;
	map : any;
	marker: any;

	@Input()
	set field(field: Field){
		this._field = field;
		if(this._field.location){
			var latlng = new google.maps.LatLng(this._field.location.lat,this._field.location.lng);
	  
	  		this.map = new google.maps.Map(document.getElementById("googleMap"), {
				center: latlng,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});

			this.marker = new google.maps.Marker({
				position: latlng,
				title:this._field.name
			});

			this.marker.setMap(this.map);
		}
	}

	ngOnInit(){
		navigator.geolocation.getCurrentPosition(position => {
		
		this.map = new google.maps.Map(document.getElementById("googleMap"), {
			center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		this.marker = new google.maps.Marker({
			position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
			title:''
		});

		this.marker.setMap(this.map);
		});
	}
}
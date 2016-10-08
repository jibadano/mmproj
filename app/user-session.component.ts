import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User }            from './user';
import { AppService}       from './app.service'
import './rxjs-extensions';

@Component({
  selector: 'user-session',
  template: `
        <div *ngIf="services.user" class="btn-group">
            <button type="button" class="btn btn-primary" (click)="showMenu = !showMenu" ><i class="fa fa-user"></i>  {{services.user.email}}</button>
            <button *ngIf="showMenu" (click)="return.emit('groups');showMenu = false" type="button" class="btn btn-primary" ><i class="fa fa-users"></i></button>
            <button *ngIf="showMenu" (click)="return.emit('config');showMenu = false" type="button" class="btn btn-primary" ><i class="fa fa-gear"></i></button>
            <button *ngIf="showMenu" (click)="return.emit('help');showMenu = false" type="button" class="btn btn-primary" ><i class="fa fa-question"></i></button>
            <button type="button" (click)="logOut.emit();showMenu = false" class="btn btn-primary" ><i class="fa fa-power-off"></i></button>
        </div>
    `
})

export class UserSessionComponent implements OnInit {

    @Output() return = new EventEmitter<string>();
    @Output() logOut = new EventEmitter();

    showMenu = false;
    constructor( private services: AppService) {}

    
    ngOnInit(){
    }

  
}
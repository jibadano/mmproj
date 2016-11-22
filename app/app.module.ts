import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AppComponent }  from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HomeComponent }   from './home.component';
import { MapComponent }   from './map.component';
import { UserSessionComponent }   from './user-session.component';
import { PlayersComponent }   from './players.component';
import { NewMatchComponent }   from './new-match.component';
import { ViewMatchComponent }   from './view-match.component';
import { GroupsComponent }   from './groups.component';
import { MenuComponent }   from './menu.component';
import { AdminComponent }   from './admin.component';

import { AppService }   from './app.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    MapComponent,
    UserSessionComponent,
    PlayersComponent,
    NewMatchComponent,
    GroupsComponent,
    ViewMatchComponent,
    MenuComponent,
    AdminComponent
  ],
   providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
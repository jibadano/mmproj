import { Component, Injectable  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User }        from './user';

import './rxjs-extensions';

@Injectable()
export class AppService {
    user : User = new User();
    
    constructor(private http: Http) {};

    exec(serviceId : string, data: any): Promise<any>{
      return this.http.post('/services', JSON.stringify({serviceId: serviceId, data: data}))
      .toPromise()
      .then(res => res.json().data as any);
    }

    login(user : User): Promise<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' , 'Authorization': 'Basic ' + btoa(user.email+ ':' + user.password)});
      let options = new RequestOptions({ headers: headers });

      return this.http.post('/login','',options)
      .toPromise()
      .then(res => {this.user = res.json(); res.json() as any});
    };

    logout(){
		  this.http.post('/logout', '').toPromise().then(res=>{
        this.user = new User();
      });
	  }


}
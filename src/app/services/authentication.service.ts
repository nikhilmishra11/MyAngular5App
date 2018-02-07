import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../constants/app.configuration';
import {RequestOptions, Request, RequestMethod, Headers} from '@angular/http';
import { HttpParams } from '@angular/common/http/src/params';
import { User } from '../models/user';
 
@Injectable()
export class AuthenticationService {
    [x: string]: any;
    
    private actionUrl: string;
    
    constructor(private http: HttpClient, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl + 'login';
     }
 

    login(username: string, password: string) {
        //console.log(this.actionUrl+'/login');
        console.log('username : '+username);
        console.log('password : '+password);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       // let options = new RequestOptions({ headers: headers });
        //let myParams = new HttpParams();
        //myParams.set('username',username);
        //myParams.set('password',password);
        //let myParams = new HttpParams();
        //myParams.set('username',username);
        //myParams.set('password',password);
        let body = { 'username': username, 'password': password };
        return this.http.post<User>(this.actionUrl, body, { headers : headers})
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
 
                return user;
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}

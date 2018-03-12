import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Configuration } from '../constants/app.configuration';
import {RequestOptions, Request, RequestMethod, Headers} from '@angular/http';
 
@Injectable()
export class AuthenticationService {
    [x: string]: any;
    
    private actionUrl: string;
    
    constructor(private http: HttpClient, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl;
     }
 

    login(username: string, password: string) {
        console.log('username : ' + username);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let body = { 'username': username, 'password': password };
        return this.http.post<string>(this.actionUrl + 'login', body, { headers : headers})
            .map(response => { 
                console.log(response);
                return JSON.stringify(response);
            });
    }
    
    valideOtp(otp: string) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let myParams = new HttpParams();
        console.log(otp);
        myParams.set('otpnum', otp);
        //let userkey: string = JSON.parse(sessionStorage.getItem('userkey'));
        //let body = { 'otpnum': otp };
        return this.http.get<User>(this.actionUrl + 'validateOtp', { headers : headers, params : {'otpnum': otp}})
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
        localStorage.removeItem('currentUser');
    }
}

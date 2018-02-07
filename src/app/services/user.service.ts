import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '../constants/app.configuration';

@Injectable()
export class UserService {

    private actionUrl:string;

  constructor(private http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl ;
 }
  
  getAll() {
    return this.http.get<User[]>(this.actionUrl+'users');
  }
  
  getById(id: number) {
        return this.http.get('/api/users/' + id);
    }
 
    create(user: User) {
        return this.http.post(this.actionUrl+'user', user);
    }
 
    update(user: User) {
        return this.http.put('/api/users/' + user.userId, user);
    }
 
    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }

}

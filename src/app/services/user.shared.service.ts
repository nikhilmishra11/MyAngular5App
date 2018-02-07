import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'
import { User } from '../models/user';

@Injectable()
export class SharedService {
  user: User ; 
  
  saveData(user: User){
    this.user = user;
  }
  
  getData(){
    return this.user;
  }

} 
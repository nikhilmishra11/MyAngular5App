import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/user.shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    currentUser: User;
    loading = false;
    users: User[] = [];
 
    
    constructor(
        private service:SharedService, 
        private userService: UserService,
        private router:Router){
        this.service = service;
       
      }
    
    ngOnInit() {
        this.users = new Array<User>();
        //console.log(this.service.getData());
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        //this.users.push(this.service.getData());
        this.userService.getAll().subscribe(
            data => {
                this.users = data;
                //this.service.saveData(data);
                //this.router.navigate(['home']);
            },
            error => {
                //this.alertService.error(error);
                this.loading = false;
            }
        );
    }
}

import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../services/user.shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

   model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private service:SharedService
    ) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        console.log(this.returnUrl);
    }
    
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    console.log(data);
                    this.service.saveData(data);
                    sessionStorage.setItem("currentUser", JSON.stringify(data));
                    this.router.navigate(['home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

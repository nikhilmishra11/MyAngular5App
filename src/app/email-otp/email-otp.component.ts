import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-email-otp',
  templateUrl: './email-otp.component.html',
  styleUrls: ['./email-otp.component.css']
})
export class EmailOtpComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  currentUser: User;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
      
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      console.log(this.returnUrl);
  }
  
  valideOtp() {
      this.loading = true;
      this.authenticationService.valideOtp(this.model.otp)
          .subscribe(
              data => {
                  console.log(data);
                  sessionStorage.removeItem('userkey');
                  sessionStorage.setItem('currentUser', JSON.stringify(data));
                  this.router.navigate(['home']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}

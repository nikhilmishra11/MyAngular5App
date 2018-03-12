import { AuthGuard } from '../guard/auth.guard';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { EmailOtpComponent } from '../email-otp/email-otp.component';
 
const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'otp', component: EmailOtpComponent },
    { path: 'register', component: RegisterComponent },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalComponent } from './profile/personal/personal.component';
import { PasswordComponent } from './profile/password/password.component';
import { AvtarComponent } from './profile/avtar/avtar.component';
import { RegisterComponent } from './register/register.component'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [{
      path: 'personal',
      component: PersonalComponent
    },
    {
      path: 'password',
      component: PasswordComponent
    },
    {
      path: 'avtar',
      component: AvtarComponent
    }

    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

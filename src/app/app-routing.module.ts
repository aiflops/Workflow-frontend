import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalenderComponent } from './dashboard/calender/calender.component';
import { ExitsComponent } from './dashboard/exits/exits.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { PeopleComponent } from './dashboard/people/people.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { ExtendComponent } from './dashboard/extend/extend.component';
import { PermissionsComponent } from './dashboard/permissions/permissions.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LogoutGuard } from './guards/logout.guards';
import { AccountGuard } from './guards/account.guards';
import { RefuseComponent } from './refuse/refuse.component';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [

  { path: '', redirectTo: '/calender', pathMatch: 'full' },

  { path: 'calender', data: { 'barVisible': true }, component: CalenderComponent, canActivate: [AccountGuard]  },

  { path: 'exits', data: { 'barVisible': true }, component: ExitsComponent, canActivate: [AccountGuard]  },

  // { path: 'message', data: { 'barVisible': true }, component: MessagesComponent, canActivate: [AccountGuard]  },

  { path: 'settings', data: { 'barVisible': true }, component: SettingsComponent, canActivate: [AccountGuard]  },

  { path: 'people', data: { 'barVisible': true }, component: PeopleComponent, canActivate: [AccountGuard]  },

  { path: 'extend', data: { 'barVisible': true }, component: ExtendComponent, canActivate: [AccountGuard]  },

  { path: 'permissions', data: { 'barVisible': true }, component: PermissionsComponent, canActivate: [AccountGuard]  },

  { path: 'login', data: { 'barVisible': false }, component: LoginComponent, canActivate: [LogoutGuard]  },

  { path: 'changePassword', data: { 'barVisible': false }, component: ChangePasswordComponent, canActivate: [LogoutGuard]  },

  { path: 'refuse/:hash', data: { 'barVisible': false }, component: RefuseComponent  },

  { path: 'confirm/:hash', data: { 'barVisible': false }, component: ConfirmComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

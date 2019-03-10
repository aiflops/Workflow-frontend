import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalenderComponent } from './calender/calender.component';
import { ExitsComponent } from './exits/exits.component';
import { MessagesComponent } from './messages/messages.component';
import { SettingsComponent } from './settings/settings.component';
import { PeopleComponent } from './people/people.component';
import { ExtendComponent } from './extend/extend.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { MounthComponent } from './calender/mounth/mounth.component';
import { DayModalComponent } from './calender/day-modal/day-modal.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CalenderComponent,
    ExitsComponent,
    MessagesComponent,
    SettingsComponent,
    PeopleComponent,
    ExtendComponent,
    PermissionsComponent,
    MounthComponent,
    DayModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DashboardModule { }

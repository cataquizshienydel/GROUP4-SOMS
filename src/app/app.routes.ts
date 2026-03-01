import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { MainLayoutComponent } from './component/layout/main-layout/main-layout.component';
import { AdminDashboardComponent } from './component/admin/dashboard/dashboard.component';
import { QrCodesComponent } from './component/admin/qr-codes/qr-codes.component';
import {  OfficerDashboardComponent } from './component/officer/dashboard/dashboard.component';
import { CreateAnnouncementComponent } from './component/officer/create-announcement/create-announcement.component';
import { EventsComponent } from './component/officer/events/events.component';
import { StudentDashboardComponent } from './component/student/dashboard/dashboard.component';
import { StudentEventsComponent } from './component/student/events/events.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'admin/dashboard', component: AdminDashboardComponent },
      { path: 'admin/qr-codes', component: QrCodesComponent },
      { path: 'officer/dashboard', component: OfficerDashboardComponent },
      { path: 'officer/create-announcement', component: CreateAnnouncementComponent },
      { path: 'officer/qr-codes', component: QrCodesComponent },
      { path: 'officer/events', component: EventsComponent },
      { path: 'student/dashboard', component: StudentDashboardComponent },
      { path: 'student/events', component: StudentEventsComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
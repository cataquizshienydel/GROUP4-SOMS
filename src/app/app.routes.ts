import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { AdminDashboardComponent } from './component/admin/dashboard/dashboard.component';
import { QrCodesComponent } from './component/admin/qr-codes/qr-codes.component';
import { OfficerDashboardComponent } from './component/officer/dashboard/dashboard.component';
import { CreateAnnouncementComponent } from './component/officer/create-announcement/create-announcement.component';
import { EventsComponent } from './component/officer/events/events.component';
import { StudentDashboardComponent } from './component/student/dashboard/dashboard.component';
import { StudentEventsComponent } from './component/student/events/events.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/qr-codes', component: QrCodesComponent },
  { path: 'officer/dashboard', component: OfficerDashboardComponent },
  { path: 'officer/qr-codes', component: QrCodesComponent },
  { path: 'officer/create-announcement', component: CreateAnnouncementComponent },
  { path: 'officer/events', component: EventsComponent },
  { path: 'student/dashboard', component: StudentDashboardComponent },
  { path: 'student/events', component: StudentEventsComponent },
  { path: '**', redirectTo: 'login' }
];
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isOpen: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  get currentUser(): any { return this.authService.getCurrentUser(); }
  get role(): string { return this.currentUser?.role || ''; }

  get menus() {
    const admin = [
      { label: 'Dashboard', piIcon: 'pi pi-home', route: '/admin/dashboard' },
      { label: 'QR Codes', piIcon: 'pi pi-qrcode', route: '/admin/qr-codes' },
    ];
    const officer = [
      { label: 'Dashboard', piIcon: 'pi pi-home', route: '/officer/dashboard' },
      { label: 'Create Announcement', piIcon: 'pi pi-plus-circle', route: '/officer/create-announcement' },
      { label: 'QR Codes', piIcon: 'pi pi-qrcode', route: '/officer/qr-codes' },
      { label: 'Events', piIcon: 'pi pi-calendar', route: '/officer/events' },
    ];
    const student = [
      { label: 'Dashboard', piIcon: 'pi pi-home', route: '/student/dashboard' },
      { label: 'Events', piIcon: 'pi pi-calendar', route: '/student/events' },
    ];
    if (this.role === 'admin') return admin;
    if (this.role === 'officer') return officer;
    return student;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
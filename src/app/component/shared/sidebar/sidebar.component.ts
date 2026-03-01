// src/app/component/shared/sidebar/sidebar.component.ts
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

  get currentUser(): any {
    return this.authService.getCurrentUser();
  }

  get role(): string {
    return this.currentUser?.role || '';
  }

  get adminMenus() {
    return [
      { label: 'Dashboard', icon: 'home', route: '/admin/dashboard' },
      { label: 'QR Codes', icon: 'qr', route: '/admin/qr-codes' },
    ];
  }

  get officerMenus() {
    return [
      { label: 'Dashboard', icon: 'home', route: '/officer/dashboard' },
      { label: 'Create Announcement', icon: 'plus', route: '/officer/create-announcement' },
      { label: 'QR Codes', icon: 'qr', route: '/officer/qr-codes' },
      { label: 'Events', icon: 'calendar', route: '/officer/events' },
    ];
  }

  get studentMenus() {
    return [
      { label: 'Dashboard', icon: 'home', route: '/student/dashboard' },
      { label: 'Events', icon: 'calendar', route: '/student/events' },
    ];
  }

  get menus() {
    if (this.role === 'admin') return this.adminMenus;
    if (this.role === 'officer') return this.officerMenus;
    return this.studentMenus;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}

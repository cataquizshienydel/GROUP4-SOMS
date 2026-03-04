// main-layout.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, TopbarComponent, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  sidebarOpen: boolean = true;

  ngOnInit(): void {
    // Auto collapse on mobile/tablet on load
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    if (window.innerWidth <= 768) {
      this.sidebarOpen = false; // hidden on mobile
    } else if (window.innerWidth <= 1024) {
      this.sidebarOpen = false; // collapsed on tablet
    } else {
      this.sidebarOpen = true; // open on PC
    }
  }

  onToggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
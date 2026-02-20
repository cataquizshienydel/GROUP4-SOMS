// officer-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Announcement {
  id: number;
  title: string;
  author: string;
  date: string;
  courses: string;
  content: string;
  status: 'approved' | 'pending';
  image?: string;
}

@Component({
  selector: 'app-officer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',  // ✅ CORRECT
styleUrls: ['./dashboard.component.css']    // ✅ CORRECT
})
export class OfficerDashboardComponent implements OnInit {

  announcements: Announcement[] = [
    {
      id: 1,
      title: 'For all students who do not enroll.',
      author: 'Officer John',
      date: 'Jan 29',
      courses: 'IT, EMT, TCM',
      content: 'Calling the attention of all students who do not plan to enroll this coming Second Semester, AY 2025–2026: To protect your academic standing, you are strongly advised to file a LOA (Leave of Absence). Filing an approved LOA ensures that the semester will NOT be counted toward your maximum residency period. This means your residency status will be preserved, and your approved absence will be properly recorded.',
      status: 'approved',
      image: 'assets/ustp-logo.png'
    },
    {
      id: 2,
      title: 'Welcome to the New Semester!',
      author: 'Officer John',
      date: 'Jan 20',
      courses: 'IT, EMT, TCM',
      content: 'We are excited to welcome all students to the new semester. Please check your schedules and attend orientation sessions.',
      status: 'approved'
    },
    {
      id: 3,
      title: 'IT Department Workshop',
      author: 'Officer Sarah',
      date: 'Jan 22',
      courses: 'IT',
      content: 'Join us for a hands-on workshop on web development basics. Date: January 30, 2025. Location: IT Lab 101.',
      status: 'approved'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.router.navigate(['/login']);
  }

  goToCreateAnnouncement(): void {
    this.router.navigate(['/officer/create-announcement']);
  }

  goToQrCodes(): void {
    this.router.navigate(['/officer/qr-codes']);
  }

  goToEvents(): void {
    this.router.navigate(['/officer/events']);
  }
}

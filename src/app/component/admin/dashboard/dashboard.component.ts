
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
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',  
styleUrls: ['./dashboard.component.css']    
})
export class AdminDashboardComponent implements OnInit {

  announcements: Announcement[] = [
    {
      id: 1,
      title: 'For all students who do not enroll.',
      author: 'Officer John',
      date: 'Jan 29',
      courses: 'IT, EMT, TCM',
      content: 'Calling the attention of all students who do not plan to enroll this coming Second Semester, AY 2025–2026: To protect your academic standing, you are strongly advised to file a LOA (Leave of Absence). Filing an approved LOA ensures that the semester will NOT be counted toward your maximum residency period. This means your residency status will be preserved, and your approved absence will be properly recorded. In addition, a LOA will officially excuse your non-enrollment for up to one (1) academic year, in line with applicable school policies and the Free Higher Education provision. Please be reminded that students who do not enroll without an approved LOA may have their residency interrupted and may encounter issues regarding their student status and eligibility for benefits. All concerned students are requested to coordinate with the Office of the Campus Registrar for the LOA form, requirements, and submission deadline. Thank you for your prompt compliance.',
      status: 'approved'
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
    },
    {
      id: 4,
      title: 'EMT Field Trip Announcement',
      author: 'Officer John',
      date: 'Jan 25',
      courses: 'EMT',
      content: 'EMT students are invited to a field trip to the local hospital emergency department. Limited slots available.',
      status: 'pending'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.router.navigate(['/login']);
  }

  goToQrCodes(): void {
    this.router.navigate(['/admin/qr-codes']);
  }

  approveAnnouncement(announcement: Announcement): void {
    announcement.status = 'approved';
  }

  rejectAnnouncement(announcement: Announcement): void {
    this.announcements = this.announcements.filter(a => a.id !== announcement.id);
  }
}

// student-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
}

interface Announcement {
  id: number;
  title: string;
  author: string;
  date: string;
  courses: string;
  courseList: string[];
  content: string;
  status: 'approved';
  image?: string;
  likes: number;
  comments: number;
  liked: boolean;
  disLiked: boolean;
  showComments: boolean;
  commentList: Comment[];
  newComment: string;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  studentCourse: string = 'IT';
  activeFilter: string = 'ALL';

  announcements: Announcement[] = [
    {
      id: 1,
      title: 'For all students who do not enroll.',
      author: 'Officer John',
      date: 'Jan 29',
      courses: 'IT, EMT, TCM',
      courseList: ['IT', 'EMT', 'TCM'],
      content: 'Calling the attention of all students who do not plan to enroll this coming Second Semester, AY 2025–2026: To protect your academic standing, you are strongly advised to file a LOA (Leave of Absence). Filing an approved LOA ensures that the semester will NOT be counted toward your maximum residency period. This means your residency status will be preserved, and your approved absence will be properly recorded. In addition, a LOA will officially excuse your non-enrollment for up to one (1) academic year, in line with applicable school policies and the Free Higher Education provision.',
      status: 'approved',
      image: 'assets/ustp-logo.png',
      likes: 0,
      comments: 0,
      liked: false,
      disLiked: false,
      showComments: false,
      commentList: [],
      newComment: ''
    },
    {
      id: 2,
      title: 'Welcome to the New Semester!',
      author: 'Officer John',
      date: 'Jan 20',
      courses: 'IT, EMT, TCM',
      courseList: ['IT', 'EMT', 'TCM'],
      content: 'We are excited to welcome all students to the new semester. Please check your schedules and attend orientation sessions.',
      status: 'approved',
      likes: 1,
      comments: 1,
      liked: false,
      disLiked: false,
      showComments: false,
      commentList: [
        { id: 1, author: 'Benjamin', text: 'Looking forward to this semester!', time: 'Jan 20' }
      ],
      newComment: ''
    },
    {
      id: 3,
      title: 'IT Department Workshop',
      author: 'Officer Sarah',
      date: 'Jan 22',
      courses: 'IT',
      courseList: ['IT'],
      content: 'Join us for a hands-on workshop on web development basics. Date: January 30, 2025. Location: IT Lab 101.',
      status: 'approved',
      likes: 0,
      comments: 0,
      liked: false,
      disLiked: false,
      showComments: false,
      commentList: [],
      newComment: ''
    }
  ];

  get filteredAnnouncements(): Announcement[] {
    if (this.activeFilter === 'ALL') return this.announcements;
    return this.announcements.filter(a => a.courseList.includes(this.activeFilter));
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  toggleLike(announcement: Announcement): void {
    if (announcement.liked) {
      announcement.likes--;
      announcement.liked = false;
    } else {
      announcement.likes++;
      announcement.liked = true;
      if (announcement.disLiked) {
        announcement.disLiked = false;
      }
    }
  }

  toggleDislike(announcement: Announcement): void {
    if (announcement.disLiked) {
      announcement.disLiked = false;
    } else {
      announcement.disLiked = true;
      if (announcement.liked) {
        announcement.liked = false;
        announcement.likes--;
      }
    }
  }

  toggleComment(announcement: Announcement): void {
    announcement.showComments = !announcement.showComments;
  }

  submitComment(announcement: Announcement): void {
    const text = announcement.newComment.trim();
    if (!text) return;
    announcement.commentList.push({
      id: announcement.commentList.length + 1,
      author: 'Benjamin',
      text: text,
      time: 'Just now'
    });
    announcement.comments++;
    announcement.newComment = '';
  }

  deleteComment(announcement: Announcement, commentId: number): void {
    announcement.commentList = announcement.commentList.filter(c => c.id !== commentId);
    announcement.comments--;
  }

  goToEvents(): void {
    this.router.navigate(['/student/events']);
  }

  onLogout(): void {
    this.router.navigate(['/login']);
  }
}
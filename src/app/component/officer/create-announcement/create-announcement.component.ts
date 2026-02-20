// create-announcement.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-announcement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent {

  title: string = '';
  content: string = '';
  selectedFileName: string = '';

  courses = [
    { abbr: 'IT', name: 'Information Technology', selected: false },
    { abbr: 'EMT', name: 'Emergency Medical Technology', selected: false },
    { abbr: 'TCM', name: 'Traditional Chinese Medicine', selected: false }
  ];

  constructor(private router: Router) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0].name;
    }
  }

  onSubmit(): void {
    if (!this.title.trim() || !this.content.trim()) {
      alert('Please fill in the title and content.');
      return;
    }
    const selected = this.courses.filter(c => c.selected);
    if (selected.length === 0) {
      alert('Please select at least one target course.');
      return;
    }
    alert('Announcement submitted for admin approval!');
    this.router.navigate(['/officer/dashboard']);
  }

  goBack(): void {
    this.router.navigate(['/officer/dashboard']);
  }
}
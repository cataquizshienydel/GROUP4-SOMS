
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Event {
  id: number;
  title: string;
  author: string;
  course: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  // Modal state
  showCreateModal = false;
  newEvent = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    course: 'IT'
  };

  events: Event[] = [
    {
      id: 1,
      title: 'Tech Talk: Future of AI',
      author: 'Officer John',
      course: 'IT',
      description: 'Join us for an insightful discussion about the future of artificial intelligence and its impact on technology careers.',
      date: 'Saturday, February 15, 2025',
      time: '2:00 PM',
      location: 'IT Lab 201',
      attendees: 0
    },
    {
      id: 2,
      title: 'First Aid Training Workshop',
      author: 'Officer Sarah',
      course: 'EMT',
      description: 'Mandatory training for all EMT students covering basic first aid procedures and emergency response.',
      date: 'Monday, February 10, 2025',
      time: '10:00 AM',
      location: 'Medical Building Room 305',
      attendees: 0
    }
  ];

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/officer/dashboard']);
  }

  createEvent(): void {
    this.showCreateModal = true;
  }

  closeModal(): void {
    this.showCreateModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newEvent = { title: '', description: '', date: '', time: '', location: '', course: 'IT' };
  }

  submitEvent(): void {
    if (!this.newEvent.title || !this.newEvent.date || !this.newEvent.time || !this.newEvent.location) return;

    const formatted = new Date(this.newEvent.date).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const [h, m] = this.newEvent.time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hour % 12 || 12}:${m} ${ampm}`;

    this.events.push({
      id: this.events.length + 1,
      title: this.newEvent.title,
      author: 'Officer John',
      course: this.newEvent.course,
      description: this.newEvent.description,
      date: formatted,
      time: formattedTime,
      location: this.newEvent.location,
      attendees: 0
    });

    this.closeModal();
  }

  showQR(event: Event): void {
    alert(`QR Code for: ${event.title}`);
  }
}

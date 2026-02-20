// events.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

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
    alert('Create Event feature coming soon!');
  }

  showQR(event: Event): void {
    alert(`QR Code for: ${event.title}`);
  }
}

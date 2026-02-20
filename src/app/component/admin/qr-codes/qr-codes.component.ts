// qr-codes.component.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Course {
  abbr: string;
  name: string;
  color: string;
  bgColor: string;
  qrData: string;
}

@Component({
  selector: 'app-qr-codes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qr-codes.component.html',
  styleUrls: ['./qr-codes.component.css']
})
export class QrCodesComponent implements OnInit, AfterViewInit {

  courses: Course[] = [
    {
      abbr: 'IT',
      name: 'Information Technology',
      color: '#00bcd4',
      bgColor: '#e0f7fa',
      qrData: 'ATTENDANCE:IT:USTP'
    },
    {
      abbr: 'EMT',
      name: 'Electronics and Mechanical Technology',
      color: '#4caf50',
      bgColor: '#e8f5e9',
      qrData: 'ATTENDANCE:EMT:USTP'
    },
    {
      abbr: 'TCM',
      name: 'Technology Communication Management',
      color: '#ff9800',
      bgColor: '#fff3e0',
      qrData: 'ATTENDANCE:TCM:USTP'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Generate QR codes after view is initialized
    setTimeout(() => {
      this.courses.forEach(course => {
        this.generateQR(course);
      });
    }, 100);
  }

  generateQR(course: Course): void {
    const canvas = document.getElementById('qr-' + course.abbr) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple QR-like visual pattern using canvas
    const size = 120;
    const moduleSize = 10;
    const modules = size / moduleSize;

    // Parse color for QR
    const color = course.color;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Generate pseudo-random pattern based on course data
    const data = course.qrData;
    let seed = 0;
    for (let i = 0; i < data.length; i++) {
      seed += data.charCodeAt(i);
    }

    const seededRandom = (n: number): number => {
      const x = Math.sin(seed + n) * 10000;
      return x - Math.floor(x);
    };

    ctx.fillStyle = color;

    // Draw finder patterns (corners)
    const drawFinder = (x: number, y: number) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, moduleSize * 7, moduleSize * 7);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + moduleSize, y + moduleSize, moduleSize * 5, moduleSize * 5);
      ctx.fillStyle = color;
      ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3);
    };

    drawFinder(0, 0);
    drawFinder((modules - 7) * moduleSize, 0);
    drawFinder(0, (modules - 7) * moduleSize);

    // Fill data area with pattern
    ctx.fillStyle = color;
    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        // Skip finder pattern areas
        const inTopLeft = row < 8 && col < 8;
        const inTopRight = row < 8 && col >= modules - 8;
        const inBottomLeft = row >= modules - 8 && col < 8;

        if (!inTopLeft && !inTopRight && !inBottomLeft) {
          if (seededRandom(row * modules + col) > 0.5) {
            ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
          }
        }
      }
    }
  }

  downloadQR(course: Course): void {
    const canvas = document.getElementById('qr-' + course.abbr) as HTMLCanvasElement;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `QR-Code-${course.abbr}-Attendance.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}

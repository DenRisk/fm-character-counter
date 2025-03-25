import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-letter-density',
  imports: [],
  templateUrl: './letter-density.component.html',
  styleUrl: './letter-density.component.css',
})
export class LetterDensityComponent {
  @Input() letter: string = '';
  @Input() count: number = 0;
  @Input() percentage: string = '';

  // Berechnet die Breite der Graph-Leiste in Prozent
  getBarWidth(): string {
    return `${this.percentage}%`;
  }
}

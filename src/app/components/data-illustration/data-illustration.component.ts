import { NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-data-illustration',
  imports: [NgSwitch, NgSwitchCase, NgTemplateOutlet, IconComponent],
  templateUrl: './data-illustration.component.html',
  styleUrl: './data-illustration.component.css',
})
export class DataIllustrationComponent {
  @Input() value: number = 0;
  @Input() label: string = '';
  @Input() colorTheme: 'char' | 'word' | 'sentence' = 'char';
}

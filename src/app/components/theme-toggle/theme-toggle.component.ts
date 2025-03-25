import { Component, inject, Signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css'],
  imports: [IconComponent],
})
export class ThemeToggleComponent {
  private themeService: ThemeService = inject(ThemeService);

  isDarkMode: Signal<boolean> = this.themeService.isDarkMode;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}

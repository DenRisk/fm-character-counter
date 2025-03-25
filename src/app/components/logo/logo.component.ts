import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-logo',
  imports: [IconComponent],
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  private themeService: ThemeService = inject(ThemeService);

  isDarkMode = this.themeService.isDarkMode;
}

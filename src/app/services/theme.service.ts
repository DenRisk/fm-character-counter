import {
  Injectable,
  Renderer2,
  RendererFactory2,
  Signal,
  signal,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSignal = signal<boolean>(
    localStorage.getItem('theme') === 'dark' || this.prefersDarkMode()
  );

  constructor() {
    this.applyTheme(!this.themeSignal());
  }

  private prefersDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  get isDarkMode(): Signal<boolean> {
    return this.themeSignal;
  }

  toggleTheme(): void {
    this.themeSignal.set(!this.themeSignal());
    localStorage.setItem('theme', this.themeSignal() ? 'dark' : 'light');
    this.applyTheme(!this.themeSignal());
  }

  private applyTheme(isLightMode: boolean): void {
    const root = document.documentElement;

    if (isLightMode) {
      root.style.setProperty('--color-neutral-900', '#ffffff');
      root.style.setProperty('--color-neutral-800', '#f2f2f7');
      root.style.setProperty('--color-neutral-700', '#f2f2f7');
      root.style.setProperty('--color-neutral-600', '#e4e4ef');
      root.style.setProperty('--color-neutral-200', '#12131a');
      root.style.setProperty('--color-neutral-100', '#21222c');
      root.style.setProperty('--color-neutral-0', '#12131a');
    } else {
      root.style.setProperty('--color-neutral-900', '#12131a');
      root.style.setProperty('--color-neutral-800', '#21222c');
      root.style.setProperty('--color-neutral-700', '#2a2b37');
      root.style.setProperty('--color-neutral-600', '#404254');
      root.style.setProperty('--color-neutral-200', '#e4e4ef');
      root.style.setProperty('--color-neutral-100', '#f2f2f7');
      root.style.setProperty('--color-neutral-0', '#ffffff');
    }
  }
}

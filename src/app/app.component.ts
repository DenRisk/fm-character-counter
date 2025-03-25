import { Component, computed, effect, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DataIllustrationComponent } from './components/data-illustration/data-illustration.component';
import { LetterDensityComponent } from './components/letter-density/letter-density.component';
import { LogoComponent } from './components/logo/logo.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { IconComponent } from './components/icon/icon.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    ReactiveFormsModule,
    ThemeToggleComponent,
    CheckboxComponent,
    DataIllustrationComponent,
    LogoComponent,
    LetterDensityComponent,
    IconComponent,
  ],
})
export class AppComponent {
  private wordsPerMinute = 200;

  textArea = signal<string>('');
  excludedSpaces = signal<boolean>(false);
  characterLimitSet = signal<boolean>(false);
  characterLimitCount = signal<number>(0);
  showAllLetters = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.characterLimitSet()) {
        this.characterLimitCount.set(0);
      }
    });
  }

  readingTime = computed(() => {
    const wordCount = this.wordCount();
    return this.calculateReadingTime(wordCount);
  });

  totalCharacters = computed(() =>
    this.excludedSpaces()
      ? this.textArea().replace(/\s/g, '').length
      : this.textArea().length
  );

  wordCount = computed(() =>
    this.textArea().trim() ? this.textArea().trim().split(/\s+/).length : 0
  );

  sentenceCount = computed(() =>
    this.textArea().trim()
      ? this.textArea()
          .split(/[.!?]+/)
          .filter((s) => s.trim()).length
      : 0
  );

  characterLimitExceeded = computed(() =>
    this.characterLimitSet() && this.characterLimitCount() !== 0
      ? this.totalCharacters() >= this.characterLimitCount()
      : false
  );

  letterFrequency = computed(() => {
    const text = this.textArea()
      .toLowerCase()
      .replace(/[^a-zäöüß]/g, '');
    const totalLetters = text.length;
    const frequencyMap: Record<string, number> = {};

    for (const char of text) {
      frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }

    return Object.entries(frequencyMap)
      .map(([letter, count]) => ({
        letter: letter.toUpperCase(),
        count,
        percentage:
          totalLetters > 0
            ? String(((count / totalLetters) * 100).toFixed(2))
            : '',
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  });

  visibleLetters = computed(() =>
    this.showAllLetters()
      ? this.letterFrequency()
      : this.letterFrequency().slice(0, 5)
  );

  toggleExcludedSpaces = () => {
    this.excludedSpaces.set(!this.excludedSpaces());
  };

  toggleCharacterLimit = () => {
    this.characterLimitSet.set(!this.characterLimitSet());
  };

  toggleShowAllLetters = () => {
    this.showAllLetters.set(!this.showAllLetters());
  };

  updateTextArea(event: Event) {
    const target = event.target as HTMLTextAreaElement;

    if (this.characterLimitExceeded()) {
      return;
    }

    this.textArea.set(target.value);
  }

  updateTextLimit(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim();

    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      return;
    }

    this.characterLimitCount.set(numberValue);
  }

  private calculateReadingTime(wordCount: number): string {
    const minutes = wordCount / this.wordsPerMinute;
    const roundedMinutes = Math.ceil(minutes); // Abrunden oder Aufrunden je nach Bedarf
    return `${roundedMinutes > 0 ? '<' : ''}${roundedMinutes} minute${
      roundedMinutes > 1 ? 's' : ''
    }`;
  }
}

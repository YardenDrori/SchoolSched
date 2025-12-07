import { Injectable, signal, effect } from '@angular/core';
import { Theme, CATPPUCCIN_THEMES, ThemeColors } from '../models/theme.models';
import { Group } from '../models/schedule.models';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'selected-theme';
  private readonly GROUP_STORAGE_KEY = 'selected-group';

  currentTheme = signal<Theme>(this.loadTheme());
  selectedGroup = signal<Group>(this.loadGroup());

  constructor() {
    // Save theme to localStorage whenever it changes
    effect(() => {
      const theme = this.currentTheme();
      localStorage.setItem(this.THEME_STORAGE_KEY, theme);
      this.applyTheme(theme);
    });

    // Save group to localStorage whenever it changes
    effect(() => {
      const group = this.selectedGroup();
      localStorage.setItem(this.GROUP_STORAGE_KEY, group);
    });

    // Apply initial theme
    this.applyTheme(this.currentTheme());
  }

  private loadTheme(): Theme {
    const saved = localStorage.getItem(this.THEME_STORAGE_KEY);
    return (saved as Theme) || 'mocha';
  }

  private loadGroup(): Group {
    const saved = localStorage.getItem(this.GROUP_STORAGE_KEY);
    return (saved as Group) || 'A';
  }

  private applyTheme(theme: Theme): void {
    const colors = CATPPUCCIN_THEMES[theme];
    const root = document.documentElement;

    // Apply all Catppuccin colors as CSS variables
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--ctp-${key}`, value);
    });

    // Set theme attribute for conditional styling
    root.setAttribute('data-theme', theme);
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
  }

  cycleTheme(): void {
    const themes: Theme[] = ['latte', 'frappe', 'macchiato', 'mocha'];
    const current = this.currentTheme();
    const currentIndex = themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  }

  toggleGroup(): void {
    this.selectedGroup.update(g => g === 'A' ? 'B' : 'A');
  }

  getThemeColors(): ThemeColors {
    return CATPPUCCIN_THEMES[this.currentTheme()];
  }
}

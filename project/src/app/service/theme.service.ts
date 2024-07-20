import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const html = document.querySelector('html');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeColor: BehaviorSubject<string> = new BehaviorSubject<string>('dark');
  public themeColor$: Observable<string> = this.themeColor.asObservable();

  constructor() {
    prefersDarkScheme.addEventListener('change', event => {
      const newTheme = event.matches ? 'dark' : 'light';
      this.themeColor.next(newTheme);
      html?.setAttribute('data-theme', this.themeColor.value);
    });
  }

  setInitialTheme() {
    const initialTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    this.themeColor.next(initialTheme);
    html?.setAttribute('data-theme', this.themeColor.value);
  }

  updateTheme(theme: string) {
    this.themeColor.next(theme);
    html?.setAttribute('data-theme', this.themeColor.value);
  }
}

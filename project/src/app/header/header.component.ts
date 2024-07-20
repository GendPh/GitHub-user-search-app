import { Component } from '@angular/core';
import { ThemeService } from '../service/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  theme: string = "dark";

  constructor(private themeService: ThemeService) {
    this.themeService.themeColor$.subscribe((theme) => {
      this.theme = theme;
    });
  }

  updateTheme(theme: string) {
    this.themeService.updateTheme(theme);
  }

}


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './service/theme.service';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { SearchService } from './service/search.service';
import { ResultComponent } from './result/result.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SearchComponent, ResultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';

  constructor(private themeService: ThemeService, private loadMyGit: SearchService) {
    this.themeService.setInitialTheme();
    this.loadMyGit.loadMyGit();
  }
}

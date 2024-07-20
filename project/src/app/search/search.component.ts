import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { SearchService } from '../service/search.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  public userFound: boolean = true;
  public userSearch: string = '';
  public isSearching: boolean = false;

  constructor(private result: SearchService) {
    this.result.userFound$.subscribe((userFound: boolean) => {
      this.userFound = userFound;
    });
    this.result.searching$.subscribe((isSearching: boolean) => {
      this.isSearching = isSearching;
    });
  }

  public searchUser(): void {
    if (!this.userSearch.trim()) {
      this.userSearch = '';
      return;
    }

    this.result.getUser(this.userSearch.trim()).subscribe(
      {
        next: (user) => {
          this.result.searchSuccess(user);
        },
        error: (error) => {
          this.result.searchFail();
        }
      }
    );
  }
}

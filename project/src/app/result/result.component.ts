import { Component } from '@angular/core';
import { SearchService, User } from '../service/search.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  public searching: boolean = false;
  public apiExceed: boolean = false;
  public user: User | null = null;
  public year: number = 0;
  public month: string = "";
  public day: number = 0;

  constructor(private result: SearchService) {
    this.result.user$.subscribe((user: User | null) => {
      this.user = user;
      this.setJoinedDay(this.user?.created_at!);
    });

    this.result.searching$.subscribe((searching: boolean) => {
      this.searching = searching;
    });

    this.result.toManySearch$.subscribe((exceeded: boolean) => {
      this.apiExceed = exceeded;
    });
  }

  private setJoinedDay(createdAt: string): void {

    // Parse the date string into a Date object
    const date = new Date(createdAt);

    // Define an array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Extract the day, month, and year
    this.day = date.getUTCDate();
    this.month = monthNames[date.getUTCMonth()]; // getUTCMonth() returns month index (0-11)
    this.year = date.getUTCFullYear();
  }
}

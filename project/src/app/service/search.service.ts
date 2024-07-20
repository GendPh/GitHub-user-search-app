import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  hireable?: string;
  bio?: string;
  twitter_username?: null,
  public_repos: 33,
  public_gists: 0,
  followers: 3,
  following: 2,
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = 'https://api.github.com/users/';

  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.user.asObservable();

  private userFound: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public userFound$: Observable<boolean> = this.userFound.asObservable();

  private searching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public searching$: Observable<boolean> = this.searching.asObservable();

  private toManySearch: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public toManySearch$: Observable<boolean> = this.toManySearch.asObservable();

  constructor(private http: HttpClient) {
  }

  public getUser(username: string): Observable<User> {
    this.searching.next(true);

    return this.http.get<User>(this.url + username);
  }

  public searchSuccess(user: User): void {
    this.userFound.next(true);
    this.user.next(user);
    this.searching.next(false);
  }
  public searchFail(): void {
    this.userFound.next(false);
    this.user.next(null);
    this.searching.next(false);
  }

  public loadMyGit(): void {
    this.getUser("gendph").subscribe(
      {
        next: (user) => {
          this.searchSuccess(user);
        },
        error: (error) => {
          if (error.status == 403) {
            this.searching.next(false);
            this.toManySearch.next(true);
            this.user.next(null)
          } else {
            this.searchFail();
          }
        }
      }

    );
  }
}

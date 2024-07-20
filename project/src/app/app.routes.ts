import { Routes } from '@angular/router';
import { ResultComponent } from './result/result.component';

export const routes: Routes = [
  { path: 'user/GendPh', component: ResultComponent },
  { path: 'user/:name', component: ResultComponent },
  { path: '', redirectTo: 'user/GendPh', pathMatch: 'full' },
  { path: '**', redirectTo: 'user/GendPh', pathMatch: 'full' }
];
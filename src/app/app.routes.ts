import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/pages/homepage/homepage.component';
import { BookListComponent } from './shared/pages/book-list/book-list.component';

import { AddBookComponent } from './features/book/add-book/add-book.component';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { PublisherListComponent } from './components/publisher/publisher-list/publisher-list.component';
import { BookUpdateComponent } from './features/book/book-update/book-update.component';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent},
  { path: 'books', component: BookListComponent},
  { path:'addBook',component : AddBookComponent ,canActivate:[authGuard],
  data:{requiredRoles:['Admin']}
  },
  {path:'getAllCategories',component:CategoryListComponent},
  {path:'getAllPublisher',component:PublisherListComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'book/:id/book-update',component:BookUpdateComponent}
];

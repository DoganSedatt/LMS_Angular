import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/pages/homepage/homepage.component';
import { BookListComponent } from './shared/pages/admin/book/book-list/book-list.component';

import { AddBookComponent } from './shared/pages/admin/book/add-book/add-book.component';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { CategoryListComponent } from './shared/pages/admin/category/category-list/category-list.component';
import { PublisherListComponent } from './shared/pages/admin/publisher/publisher-list/publisher-list.component';
import { BookUpdateComponent } from './shared/pages/admin/book/book-update/book-update.component';
import { authGuard } from './core/guards/auth.guard';
import { AdminComponent } from './shared/pages/admin/admin.component';
import { AddPublisherComponent } from './shared/pages/admin/publisher/add-publisher/addpublisher.component';
import { publisherUpdateComponent } from './shared/pages/admin/publisher/publisher-update/publisherupdate.component';
import { MemberListComponent } from './shared/pages/admin/member/member-list/member-list.component';
import { ProfileComponent } from './shared/pages/admin/member/profile/profile.component';


export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'members',component:MemberListComponent},
  {path:'homepage/:id/profile',component:ProfileComponent},
  {path:'admin',component:AdminComponent,canActivate:[authGuard],data:{requiredRoles:['Admin']},
  children:
  [
    ////BOOK//BOOK////BOOK//////BOOK////BOOK//////
    {path:'addBook',component:AddBookComponent},
    {path:'getBooks', component: BookListComponent},
    {path:'getBooks/book/:id/book-update',component:BookUpdateComponent},
    
    /////CATEGORY/////CATEGORY////CATEGORY/////CATEGORY//CATEGORY/////CATEGORY///
    {path:'getAllCategories',component:CategoryListComponent},


    ///PUBLISHER///PUBLISHER///PUBLISHER//PUBLISHER/////PUBLISHER////PUBLISHER/////PUBLISHER//
    {path:'getPublisher',component:PublisherListComponent},
    {path:'addPublisher',component:AddPublisherComponent},
    {path:'getPublisher/publisher/:id/publisherupdate',component:publisherUpdateComponent},

    ///MEMBER///MEMBER///MEMBER//MEMBER/////MEMBER////MEMBER/////MEMBER//
    {path:'getMembers',component:MemberListComponent}

  ],
  

  }
];

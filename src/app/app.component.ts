import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './shared/pages/admin/book/book-list/book-list.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { CategoryComponent } from './shared/pages/admin/category/category/category.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BookListComponent,NavbarComponent,ToastrModule,CategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  
}

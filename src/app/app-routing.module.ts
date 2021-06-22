import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookImageComponent } from './components/add-book-image/add-book-image.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookComponent } from './components/book/book.component';
import { BorrowComponent } from './components/borrow/borrow.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full", component:BookComponent},
  {path:"book/:id", component:BookDetailComponent},
  {path:"book/:id/borrow", component:BorrowComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"profile", component:ProfileComponent},
  {path:"add", component:AddBookComponent, canActivate:[LoginGuard]},
  {path:"add/image/:authorId", component:AddBookImageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

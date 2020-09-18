import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Lazy Loading
const routes: Routes = [
  {path: '', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

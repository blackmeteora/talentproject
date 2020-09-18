import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactListComponent } from './contact-list/contact-list.component';


const routes: Routes = [

  { path: '', component: ContactListComponent },
  { path: 'Contact/Edit/:id', component: ContactEditComponent },
  { path: 'Contact/New', component: ContactEditComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }

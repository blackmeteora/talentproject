import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactdetailComponent } from './contactdetail/contactdetail.component';
import { ContactlistComponent } from './contactlist/contactlist.component';


const routes: Routes = [
  { path: '', component: ContactlistComponent },
  { path: 'ContactDetail/:id', component: ContactdetailComponent },
  { path: 'NewContact', component: ContactdetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

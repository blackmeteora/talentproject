import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactService } from '../models/contact.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ContactListComponent, ContactEditComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule
  ],
  providers: [ContactService],
})
export class ContactModule { }

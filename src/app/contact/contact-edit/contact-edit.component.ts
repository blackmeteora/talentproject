import { Component, OnInit, Input } from '@angular/core';
import {trigger, transition, style, animate} from '@angular/animations';
import { ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../../models/contact';
import { ContactService } from '../../models/contact.service';


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('500ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
    ])
  ]
})
export class ContactEditComponent implements OnInit {

  @Input() contact:Contact;

  private routed: boolean;

  constructor(private route: ActivatedRoute,private contactService:ContactService) { }

  ngOnInit(): void {

    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];

        this.contactService.getContact(id).subscribe(contact => {
          if(this.contactService.getData()!=undefined){
             contact = this.contactService.getData().find(x=>x.Id==id); //Mockup server üzerinden kayıt işlemleri yapamadığım için bu yöneteme başvurdum.
          }
          this.contact = contact;
        });

        this.routed=true;
      } else {
        this.contact = new Contact();
        this.routed=false;
      }
    })
  }

  save():void{
    if(!this.routed){
      this.contactService.save(this.contact);
    }

    window.history.back();
  }

  goBack():void{
    window.history.back();
  }

}

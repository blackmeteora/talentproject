import { Component, OnInit, Input } from '@angular/core';
import {trigger, transition, style, animate, query, stagger, keyframes} from '@angular/animations';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactService } from '../models/contact.service';

@Component({
  selector: 'app-contactdetail',
  templateUrl: './contactdetail.component.html',
  styleUrls: ['./contactdetail.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('500ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
    ])
  ]
})
export class ContactdetailComponent implements OnInit {

  @Input() contact:Contact;
  private routed:boolean;

  constructor(private location:Location, private route: ActivatedRoute,private contactService:ContactService) { }

  ngOnInit(): void {

    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.contactService.getContact(id).subscribe(contact => {this.contact = contact; console.log(contact)});
        this.routed=true;
      } else {
        this.contact = new Contact();
        this.routed=false;
      }
    })
  }

  goBack():void{
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import {trigger, transition, style, animate, query, stagger, keyframes} from '@angular/animations';

import { ContactService } from '../../models/contact.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),


        query(':enter', stagger('300ms', [
          animate('.5s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),

      ])
    ])
  ]
})
export class ContactListComponent implements OnInit {

  contactData:any = { Data:[], SearchData:[] };
  dataLoaded:boolean=false;


  constructor(private contactService: ContactService){
    this.loadContactData();
  }

  loadContactData():void{

    this.contactService.getContactList().subscribe(result=>{
      console.log(result);
      if(this.contactService.getData()==undefined){
         this.contactService.setData(result); //Mock server üzerinden save ve create işlemi yapamadığım için bu yönteme başvurmak zorunda kaldım.
      }
      this.contactData.Data = this.contactService.getData();
      this.contactData.SearchData = this.contactData.Data;
      this.dataLoaded = true;
    })

  }

  search(searchTerm:string):void{
    this.contactData.SearchData = this.contactData.Data.filter(item => (item.Name+' '+item.Surname).toLowerCase().indexOf(searchTerm.toLowerCase())>-1);
  }

  delete(contact:Contact):void{
    this.contactService.delete(contact);
  }

  animateChild():any{

    return '';
  }

  ngOnInit(): void {

  }

}

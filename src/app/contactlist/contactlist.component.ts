import { Component, OnInit } from '@angular/core';
import {trigger, transition, style, animate, query, stagger, keyframes} from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from '../models/contact';
import { ContactService } from '../models/contact.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css'],
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
export class ContactlistComponent implements OnInit {

  contactData:any = { Data:[], SearchData:[] };
  dataLoaded:boolean=false;


  constructor(private http: HttpClient, private contactService: ContactService){
    this.loadContactData();
  }

  loadContactData():void{

    this.contactService.getContactList().subscribe(result=>{
      console.log(result);
      this.contactData.Data = result;
      this.contactData.SearchData = this.contactData.Data;
      this.dataLoaded = true;
    })

  }

  search(searchTerm:string):void{
    this.contactData.SearchData = this.contactData.Data.filter(item => (item.Name+' '+item.Surname).toLowerCase().indexOf(searchTerm.toLowerCase())>-1);
  }

  animateChild():any{

    return '';
  }

  ngOnInit(): void {
  }

}

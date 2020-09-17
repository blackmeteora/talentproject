import { Component } from '@angular/core';
import {trigger, transition, style, animate, query, stagger, keyframes} from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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

export class AppComponent {
  title = 'talentproject';
  contactData:any = { Data:[] };
  dataLoaded:boolean=false;


  constructor(private http: HttpClient){
    this.loadContactData("")
  }

  loadContactData(searchTerm:string):void{
    this.dataLoaded=false;
    this.http.get('https://6e7810df-1990-43a5-9227-5e9b1a096ded.mock.pstmn.io/ContactList',{headers: {'x-api-key':'PMAK-5f63a196a204ec003be29761-23bb34a5ad2d2a21a556133670de123dea'}}).subscribe(result => {
      this.contactData = result;
      this.contactData.Data = this.contactData.Data.filter(item => (item.Name+' '+item.Surname).toLowerCase().indexOf(searchTerm.toLowerCase())>-1); //Mock üzerinde bir search yapmadığım için bu şekilde yaptım.
      this.dataLoaded = true;
    }, error => console.error(error));
  }

  animateChild():any{

    return '';
  }
}

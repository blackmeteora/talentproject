import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Contact } from './contact';

@Injectable()
export class ContactService {
  private contactListUrl = 'https://2647e5e1-eae4-4603-848f-137517f8437d.mock.pstmn.io/ContactList';
  private headers = {headers: {'x-api-key':'PMAK-5f63a196a204ec003be29761-23bb34a5ad2d2a21a556133670de123dea'}};

  constructor(private http: HttpClient) {}

  getContactList() {
    return this.http
      .get<Contact[]>(this.contactListUrl, this.headers)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getContact(id: number): Observable<Contact> {
    return this.getContactList().pipe(
      map(contactlist => contactlist.find(contact => contact.Id === id))
    );
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}

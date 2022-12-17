import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private http: HttpClient) {}
  postNewContact(contact: any) {
    return this.http.post(
      'https://contacts-c2a93-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json',
      contact
    );
  }
  getAllContact() {
    return this.http
      .get(
        'https://contacts-c2a93-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json'
      )
      .pipe(
        map((data: any) => {
          const c = [];
          for (let contact in data) {
            c.push({ _id: contact, ...data[contact] });
          }
          return c;
        })
      );
  }
  getSpecificContact(firebaseId: string) {
    return this.http.get<Contact>(
      'https://contacts-c2a93-default-rtdb.asia-southeast1.firebasedatabase.app/contacts/' +
        firebaseId +
        '.json'
    );
  }
  deleteOneContact(firebaseId: string) {
    return this.http.delete(
      'https://contacts-c2a93-default-rtdb.asia-southeast1.firebasedatabase.app/contacts/' +
        firebaseId +
        '.json'
    );
  }
  editContact(firebaseId: string, editedContact: any) {
    return this.http.patch(
      'https://contacts-c2a93-default-rtdb.asia-southeast1.firebasedatabase.app/contacts/' +
        firebaseId +
        '.json',
      editedContact
    );
  }
}

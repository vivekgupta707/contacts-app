import { Component, OnDestroy, OnInit } from '@angular/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { FirebaseService } from '../firebase.service';
import { Contact } from '../contact';
import { UpdateService } from '../update.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(
    private firebase: FirebaseService,
    private callNumber: CallNumber,
    private updateService: UpdateService
  ) {}
  contactList!: Contact[];
  results!: Contact[];
  ngOnInit(): void {
    this.firebase.getAllContact().subscribe((contactList: Contact[]) => {
      this.contactList = contactList;
      this.results = [...this.contactList];
    });
    this.updateService.update.subscribe((data) => {
      this.firebase.getAllContact().subscribe((contactList: Contact[]) => {
        this.contactList = contactList;
        this.results = [...this.contactList];
      });
    });
  }
  callContact(phone: string) {
    this.callNumber.callNumber(phone, true);
  }
  deleteContact(firebaseId: string, index: number) {
    if (confirm('Are You Sure to delete?')) {
      this.firebase.deleteOneContact(firebaseId).subscribe((res) => {
        this.results.splice(index, 1);
        alert('Contact Deleted... ');
      });
    }
  }
  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.contactList.filter(
      (contact: Contact) => contact?.name.toLowerCase().indexOf(query) > -1
    );
  }
}

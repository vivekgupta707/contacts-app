import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  selectedTab: string = 'contacts';
  getSelected(ev: any) {
    this.selectedTab = ev.tab;
  }
}

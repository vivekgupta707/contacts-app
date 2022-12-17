import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor() {}
  update: Subject<string> = new Subject<string>();
}

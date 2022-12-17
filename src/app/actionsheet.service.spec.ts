import { TestBed } from '@angular/core/testing';

import { ActionsheetService } from './actionsheet.service';

describe('ActionsheetService', () => {
  let service: ActionsheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionsheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

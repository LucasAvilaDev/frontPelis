import { TestBed } from '@angular/core/testing';

import { ChatGrupalService } from './chat-grupal.service';

describe('ChatGrupalService', () => {
  let service: ChatGrupalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatGrupalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

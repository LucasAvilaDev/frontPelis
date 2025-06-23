import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGrupalComponent } from './chat-grupal.component';

describe('ChatGrupalComponent', () => {
  let component: ChatGrupalComponent;
  let fixture: ComponentFixture<ChatGrupalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatGrupalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatGrupalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

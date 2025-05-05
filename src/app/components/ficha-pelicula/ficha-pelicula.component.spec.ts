import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaPeliculaComponent } from './ficha-pelicula.component';

describe('FichaPeliculaComponent', () => {
  let component: FichaPeliculaComponent;
  let fixture: ComponentFixture<FichaPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaPeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

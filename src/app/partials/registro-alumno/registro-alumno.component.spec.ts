import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAlumnoComponent } from './registro-alumno.component';

describe('RegistroAlumnoComponent', () => {
  let component: RegistroAlumnoComponent;
  let fixture: ComponentFixture<RegistroAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroAlumnoComponent]
    });
    fixture = TestBed.createComponent(RegistroAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesCalendarComponent } from './classes-calendar.component';

describe('ClassesCalendarComponent', () => {
  let component: ClassesCalendarComponent;
  let fixture: ComponentFixture<ClassesCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

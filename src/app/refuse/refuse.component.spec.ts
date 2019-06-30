import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuseComponent } from './refuse.component';

describe('RefuseComponent', () => {
  let component: RefuseComponent;
  let fixture: ComponentFixture<RefuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitsComponent } from './exits.component';

describe('ExitsComponent', () => {
  let component: ExitsComponent;
  let fixture: ComponentFixture<ExitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

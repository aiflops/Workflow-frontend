import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MounthComponent } from './mounth.component';

describe('MounthComponent', () => {
  let component: MounthComponent;
  let fixture: ComponentFixture<MounthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MounthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MounthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

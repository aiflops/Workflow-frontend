import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockadeComponent } from './blockade.component';

describe('BlockadeComponent', () => {
  let component: BlockadeComponent;
  let fixture: ComponentFixture<BlockadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

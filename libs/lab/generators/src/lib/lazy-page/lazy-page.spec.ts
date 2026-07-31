import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyPage } from './lazy-page';

describe('LazyPage', () => {
  let component: LazyPage;
  let fixture: ComponentFixture<LazyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

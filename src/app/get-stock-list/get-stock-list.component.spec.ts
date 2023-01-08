import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStockListComponent } from './get-stock-list.component';

describe('GetStockListComponent', () => {
  let component: GetStockListComponent;
  let fixture: ComponentFixture<GetStockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetStockListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

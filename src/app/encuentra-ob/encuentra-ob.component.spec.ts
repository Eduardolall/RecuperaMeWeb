import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentraObComponent } from './encuentra-ob.component';

describe('EncuentraObComponent', () => {
  let component: EncuentraObComponent;
  let fixture: ComponentFixture<EncuentraObComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuentraObComponent]
    });
    fixture = TestBed.createComponent(EncuentraObComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

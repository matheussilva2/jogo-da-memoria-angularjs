import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gamemode } from './gamemode';

describe('Gamemode', () => {
  let component: Gamemode;
  let fixture: ComponentFixture<Gamemode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gamemode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gamemode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

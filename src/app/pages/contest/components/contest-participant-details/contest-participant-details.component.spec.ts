import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestParticipantDetailsComponent } from './contest-participant-details.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component ({
 standalone: true,
  selector: 'test-host',
  template: `<app-contest-participant-details [contestDetails]="testDetails" />`,
  imports: [ContestParticipantDetailsComponent]
})

class HostComponent {
  testDetails: ContestParticipantDetailsComponent = {} as ContestParticipantDetailsComponent;
}

describe('ContestParticipantDetailsComponent', () => {
  let host: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let component: ContestParticipantDetailsComponent;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestParticipantDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    const debugElement = fixture.debugElement.query(By.directive(ContestParticipantDetailsComponent));
    component = debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should transform object to array', () => {
    const mockObj = {
      a: 10, 
      b: 20, 
      c: 30
    };

    expect(component.objectToArray(mockObj)).toEqual([
      {key:'a', value:10 }, 
      {key:'b', value:20 }, 
      {key:'c', value:30 }
    ]);
  });

});

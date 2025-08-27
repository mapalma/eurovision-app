import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestsDetailsComponent } from './contests-details.component';
import { TableModule } from 'primeng/table';
import { ContestDetails } from '../../../../core/models/contest';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { mockContestDetails } from '../../../../core/services/eurovision/eurovision.service.mock';

@Component ({
 standalone: true,
  selector: 'test-host',
  template: `<app-contests-details [contestDetails]="testDetails" />`,
  imports: [ContestsDetailsComponent, TableModule]
})

class HostComponent {
  testDetails: ContestDetails = {} as ContestDetails;
}

describe('ContestsDetailsComponent', () => {
  let host: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let component: ContestsDetailsComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    const debugElement = fixture.debugElement.query(By.directive(ContestsDetailsComponent));
    component = debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should recieve contestDetails', () => {
    
    host.testDetails = mockContestDetails;
    fixture.detectChanges();
    expect(component.contestDetails()).toEqual(mockContestDetails);
  });
});

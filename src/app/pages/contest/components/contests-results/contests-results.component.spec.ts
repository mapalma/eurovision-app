import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContestsResultsComponent } from './contests-results.component';
import { mockPerformanceContestant, mockVote } from '../../../../core/services/eurovision/eurovision.service.mock';
import { Component, input, output, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PerformanceContestant, Round } from '../../../../core/models/contest';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'test-host',
  template: `<app-contests-results [rounds]="testRounds" />`,
  imports: [ContestsResultsComponent, TableModule]
})
class HostComponent {
  testRounds: Round[] = [];
}

describe('ContestsResultsComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let component: ContestsResultsComponent;
  const mockRounds= [{
          name: 'test',
          date: new Date('10/10/2000'),
          time: new Date('10/10/2000'),
          performances: [{
              contestantId: 0,
              running: 0,
              country: 'ES',
              artist: 'test',
              song: 'test',
              url: 'test',
              scores: [
                {
                  name: 'test',
                  points: 0,
                  votes: mockVote,
                },
              ],
            },
          ],
        },
      {
        name: 'test',
        date: new Date('10/10/2000'),
        time: new Date('10/10/2000'),
        performances: null
  }];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    const debugElement = fixture.debugElement.query(By.directive(ContestsResultsComponent));
    component = debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should input rounds', () => {
      host.testRounds = mockRounds;
      fixture.detectChanges();

      expect(component.rounds()).toEqual(mockRounds);
  });

  it('should filter valid rounds', () => {
      host.testRounds = mockRounds;
      fixture.detectChanges();

      expect(component.validRounds()).toEqual([mockRounds[0]]);
  });

  it('should change activeTab value when signal is set', () => {
    component.activeTab.set(2);
    expect(component.activeTab()).toBe(2);
  });

  it('should set row details when called', () => {
    component.activeTab.set(2);
    expect(component.activeTab()).toBe(2);
  });

  it('should set signals on selectRow', () => {
    const mockPerformance: PerformanceContestant = mockPerformanceContestant;
    let emittedPerformance: PerformanceContestant | undefined;

    component.rowSelected.subscribe(value => {
      emittedPerformance = value
    });

    component.onSelectRow(mockPerformance);

    expect(emittedPerformance).toBe(mockPerformanceContestant);
    
  });
});

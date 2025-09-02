import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPage } from './contest.page';
import { mockContest, mockPerformanceContestant } from '../../core/services/eurovision/eurovision.service.mock';
import { of } from 'rxjs'; 
import { EurovisionService } from '../../core/services/eurovision/eurovision.service';

describe('ContestPage', () => {
  let component: ContestPage;
  let fixture: ComponentFixture<ContestPage>;
  let EurovisionServiceMock: any;

  beforeEach(async () => {

    EurovisionServiceMock = {
      getContestDetailsByYear: jasmine.createSpy('getContestDetailsByYear').and.returnValue(of(mockContest))
    };

    await TestBed.configureTestingModule({
      imports: [ContestPage],
      providers: [{provide:EurovisionService, useValue:EurovisionServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update current year and selected year on ngOnInit', () => {
    component.ngOnInit();
    
    expect(component.currentYear).toBeDefined();
    expect(component.selectedYear).toEqual(component.currentYear);
  });

  it('should return the current year if date is greater than 15 jun', () => {
     const mockDate = new Date(2025, 6, 1); // 1 July 2025
     const currentYear = component.getCurrentContestYear(mockDate);
     expect(currentYear.getFullYear()).toBe(2025)
  });

  
  it('should return the year before if date is lower than 15 jun', () => {
     const mockDate = new Date(2025, 5, 1); // 1 July 2025
     const currentYear = component.getCurrentContestYear(mockDate);
     expect(currentYear.getFullYear()).toBe(2024)
  });

  it('should ask service for new data if onYearSelected is called', () => {
     const mockDate = new Date(2025, 5, 1); // 1 July 2025
     component.onYearSelected(mockDate);
     expect(EurovisionServiceMock.getContestDetailsByYear).toHaveBeenCalled();
  });

  it('should update signals when details drawers is closed', () => {
     component.onCloseDetails();
     expect(component.detailsOpen()).toBeFalse();
     expect(component.contentDrawerReady()).toBeFalse();
  });

  it('should update signals when row is selected', () => {
    const mockPerformance = mockPerformanceContestant;
     component.onRowSelected(mockPerformance);
     expect(component.selectedPerformance()).toEqual(mockPerformance);
     expect(component.detailsOpen()).toBeTrue();
  });
});

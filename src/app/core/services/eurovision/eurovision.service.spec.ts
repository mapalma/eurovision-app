import { TestBed } from '@angular/core/testing';
import { EurovisionService } from './eurovision.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { mockContest, mockCountries } from './eurovision.service.mock';


describe('EurovisionService', () => {
  const URL_API = 'https://eurovisionapi.runasp.net/api/';
  const URL_CATEGORY ='senior/'
  const URL_CONTEST = 'contests/';
  let service: EurovisionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(EurovisionService);
    httpMock = TestBed.inject(HttpTestingController);  // Inyectamos HttpTestingController
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return contest data', () => {

      service.getContestDetailsByYear(`${mockContest.year}`).subscribe(contest => {
        expect(contest).toBeDefined();
        expect(contest.year).toBe(mockContest.year);
      });

      let req = httpMock.expectOne(`${URL_API}${URL_CATEGORY}${URL_CONTEST}${mockContest.year}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockContest);
  });

  it('should return countries map', () => {

      service.getCountryNames().subscribe(countries => {
        expect(countries).toBeDefined();
        expect(countries[1]).toEqual(mockCountries[1]);
      });

      let req = httpMock.expectOne(`${URL_API}countries`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCountries);
  });


});

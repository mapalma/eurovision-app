import { Component, Input } from '@angular/core';
import { ContestDetails, CountryMap, PerformanceContestant } from '../../../../core/models/contest';
import { COUNTRY_CODES } from '../../../../shared/constants/country-codes';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-contest-participant-details',
  imports: [AccordionModule, TableModule],
  templateUrl: './contest-participant-details.component.html',
  styleUrl: './contest-participant-details.component.scss'
})
export class ContestParticipantDetailsComponent {
  @Input() performance!: PerformanceContestant;
  @Input() contestDetails!: ContestDetails;
  countries: CountryMap = COUNTRY_CODES;


  objectToArray(obj: Record<string, number>) {
    return Object.entries(obj)
      .filter(([_, value]) => value !== 0)
      .map(([key, value]) => ({ key, value }));
  }
}


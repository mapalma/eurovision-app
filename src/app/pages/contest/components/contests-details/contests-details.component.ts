import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ContestDetails, CountryMap } from '../../../../core/models/contest';
import { COUNTRY_CODES } from '../../../../shared/contants/country-codes';

@Component({
  selector: 'app-contests-details',
  imports: [CardModule],
  templateUrl: './contests-details.component.html',
  styleUrl: './contests-details.component.scss'
})
export class ContestsDetailsComponent {
  contestDetails = input.required<ContestDetails>();
  countries: CountryMap = COUNTRY_CODES;
}

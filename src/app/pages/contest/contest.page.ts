import { Component,inject, signal } from '@angular/core';
import { EurovisionService } from '../../core/services/eurovision/eurovision.service';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DrawerModule } from 'primeng/drawer';
import {
  Contest,
  Contestant,
  ContestDetails,
  PerformanceContestant,
  Round,
} from '../../core/models/contest';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContestsDetailsComponent } from './components/contests-details/contests-details.component';
import { ContestsResultsComponent } from "./components/contests-results/contests-results.component";
import { ContestParticipantDetailsComponent } from './components/contest-participant-details/contest-participant-details.component';

@Component({
  selector: 'app-contest',
  imports: [
    CommonModule,
    FormsModule,
    DatePickerModule,
    FloatLabelModule,
    DrawerModule,
    ContestsDetailsComponent,
    ContestsResultsComponent,
    ContestParticipantDetailsComponent
],
  templateUrl: './contest.page.html',
  styleUrl: './contest.page.scss',
})
export class ContestPage {
  readonly euroService= inject(EurovisionService);
  contestants: Contestant[] = [];
  contestDetails: ContestDetails = {} as ContestDetails;
  rounds: Round[] = [];
  validRounds: Round[] = [];
  currentYear!: Date;
  minYear: Date =  new Date('1956');
  selectedYear!: Date;
  selectedPerformance = signal<PerformanceContestant | null>(null);
  detailsOpen = signal(false);
 
  constructor() {}

  ngOnInit() {
    this.currentYear = this.getCurrentContestYear(new Date());
    this.selectedYear = this.currentYear;
    this.getContestantDataByYear(this.currentYear.getFullYear());
  }

  getCurrentContestYear(today: Date): Date {
    const currentYear = today.getFullYear();
    if (
      today.getMonth() > 5 ||
      (today.getMonth() === 5 && today.getDate() >= 15)
    ) {
      return new Date(currentYear, today.getMonth(), today.getDate());
    }
    return new Date(currentYear - 1, today.getMonth(), today.getDate());
  }

  getContestantDataByYear(year: number): void {
    this.euroService.getContestDetailsByYear(`${year}`).subscribe({
      next: (data: Contest) => {
        this.contestDetails = this.getContestEditionDetails(data);
        this.rounds = this.extendRoundsDetails(data);
        this.validRounds = this.rounds;
      },
    });
  }

  onYearSelected(date: Date): void {
    this.getContestantDataByYear(date.getFullYear());
  }

  onRowSelected(performance:PerformanceContestant){
    this.selectedPerformance.set(performance);
    this.detailsOpen.set(true);
  }

  getContestEditionDetails(data: Contest): ContestDetails {
    const { contestants, rounds, ...contestDetails } = data;
    return contestDetails;
  }

  extendRoundsDetails(data: Contest): Round[] {
    return data.rounds.map((round) => {
      if (round.performances) { // Chech if the edition was cancelled
        let extendedPerformances = round.performances.map((performance) => {
          const scoreMap: any = {};
          performance.scores.forEach(score => {
            scoreMap[score.name.toLowerCase()] = score;
          });

          let contestant = data.contestants.find(
            (contestant) => contestant.id === performance.contestantId
          );
          if (!contestant) {
            throw new Error(
              `Contestant not found for ID: ${performance.contestantId}`
            );
          }

          return { 
            ...performance, 
            ...contestant,
              juryPoints: scoreMap['jury']?.points ?? 0,
              publicPoints: scoreMap['public']?.points ?? 0,
              totalPoints: scoreMap['total']?.points ?? 0
            };
        });
        return { ...round, performances: extendedPerformances };
      } else {
        return round;
      }
    });
  }

  onCloseDetails = () => {
    this.detailsOpen.set(false);
  };
  
}

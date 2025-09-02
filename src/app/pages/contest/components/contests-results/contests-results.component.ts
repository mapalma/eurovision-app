import { Component, computed, input, output, signal, effect, WritableSignal, Input, ModelSignal, model } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { CountryMap, PerformanceContestant, Round } from '../../../../core/models/contest';
import { COUNTRY_CODES } from '../../../../shared/constants/country-codes';

@Component({
  selector: 'app-contests-results',
  imports: [    
    TableModule,
    TabsModule,],
  templateUrl: './contests-results.component.html',
  styleUrl: './contests-results.component.scss'
})
export class ContestsResultsComponent {
  rounds = input.required<Round[]>();
  validRounds = computed(() => this.rounds()?.filter(round => round.performances));
  activeTab = signal(0);
  tabsVisible = signal(true);
  rowSelected = output<PerformanceContestant>();
  countries: CountryMap = COUNTRY_CODES;

 constructor() {
    effect(() => {
      if (this.rounds()) {
        this.activeTab.set(0);
        this.tabsVisible.set(false);
        queueMicrotask(() => this.tabsVisible.set(true)); // Esto se ejecuta justo después del ciclo actual de ejecución;
      }
    });
  } 

  onSelectRow(performance: PerformanceContestant) {
    this.rowSelected.emit(performance);  
  }
}

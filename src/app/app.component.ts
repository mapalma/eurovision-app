import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './shared/components/header/header.component';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ButtonModule, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Eurovision Results Archive';

  constructor(private primeng: PrimeNG) {}
    ngOnInit() {
        
    }
}

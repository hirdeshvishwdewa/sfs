import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { SharedDataService } from '../../shared/shared-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  devices$: Observable<String[]>;
  constructor(private dataService: SharedDataService, private route: ActivatedRoute) {
    this.devices$ = this.dataService.getDevices();
  }
}

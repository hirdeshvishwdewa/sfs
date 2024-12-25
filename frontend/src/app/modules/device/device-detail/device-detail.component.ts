import { ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../shared/shared-data.service';
import { Subscription } from 'rxjs';
import { IDeviceDetail } from '../../shared/shared.model';
import { NotificationService } from 'src/core/notification.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnDestroy {
  @ViewChild('eventWrapper', { static: true }) eventWrapper!: ElementRef;
  subscriptions: Subscription = new Subscription();
  deviceId = "";
  events: IDeviceDetail[] = [];

  constructor(private dataService: SharedDataService, private route: ActivatedRoute, private cdref: ChangeDetectorRef, private notficationService: NotificationService) {
    this.subscriptions = this.getRouterParams();
  }

  ngOnInit() {
    this.prepareStreamData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private getRouterParams() {
    return this.route.params.subscribe(params => {
      this.deviceId = params['deviceId'];
    });
  }

  private prepareStreamData() {
    this.subscriptions = this.dataService.getDeviceEvents(this.deviceId).subscribe({
      next: (event: IDeviceDetail) => {
        this.events.unshift(event);
        this.events = [...this.events];
        this.cdref.detectChanges();
      },
      error: (err) => {
        this.notficationService.sendNotification("Error occurred while fetching realtime data.");
      },
    }
    );
  }
}

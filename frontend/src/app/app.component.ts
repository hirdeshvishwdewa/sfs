import { Component } from '@angular/core';
import { NotificationService } from 'src/core/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  notification$ = this.notificationService.notifications$;

  constructor(private notificationService: NotificationService) {}

  showDemoNotification() {
    this.notificationService.sendNotification("A message to alert" + new Date().getTime());
  }
}

import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {
    @Input()
    message = "";

    close() {
        this.message = "";
    }
}
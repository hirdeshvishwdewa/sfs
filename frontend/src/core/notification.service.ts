import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationSubject = new BehaviorSubject<string | null>(null);

    sendNotification(message: string): void {
        this.notificationSubject.next(message);
    }

    get notifications$(): Observable<string | null> {
        return this.notificationSubject.asObservable();
    }
}
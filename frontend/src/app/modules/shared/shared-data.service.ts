import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/core/api.service";
import { IDeviceDetail, IOrderDetails } from "./shared.model";

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    constructor(private api: ApiService) { }

    getDevices(): Observable<string[]> {
        return this.api.get(this.api.getAPIEndPoints()?.devices);
    }

    getOrder(orderId: string): Observable<IOrderDetails> {
        return this.api.get(this.api.getAPIEndPoints()?.order?.replace("{orderId}", orderId));
    }

    getDeviceEvents(deviceId: string) {
        return this.api.getStream<IDeviceDetail>(this.api.getAPIEndPoints()?.events?.replace("{deviceId}", deviceId));
    }
}
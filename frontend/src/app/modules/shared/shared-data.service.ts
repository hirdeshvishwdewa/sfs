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
        return this.api.get(`/devices`);
    }

    getOrder(orderId: string): Observable<IOrderDetails> {
        return this.api.get(`/order/` + orderId);
    }

    getDevice(id: string) {
        return this.api.getStream<IDeviceDetail>('/events/' + id);
    }
}
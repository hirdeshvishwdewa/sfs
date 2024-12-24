import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private static DEFAULT_BASE_URL = 'https://mock-api.assessment.sfsdm.org';

    constructor(private http: HttpClient) { }

    get<T>(uri: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
        const url = this.getFullURL(uri);
        return this.http.get<T>(url, { params, headers });
    }

    getStream<T>(uri: string): Observable<T> {
        const url = this.getFullURL(uri);
        return new Observable<T>((observer) => {
            const eventSource = new EventSource(url);

            eventSource.onmessage = (event) => {
                observer.next(JSON.parse(event.data) as T);
            };

            eventSource.onerror = (error) => {
                observer.error(error);
                eventSource.close();
            };

            return () => {
                eventSource.close();
            };
        });
    }

    private getFullURL (uri: string) {
        return this.getApiBaseUrl() + uri
    }

    private getApiBaseUrl(): string {
        return ApiService.DEFAULT_BASE_URL;
    }
}

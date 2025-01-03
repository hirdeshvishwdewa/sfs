import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../shared/shared-data.service';
import { catchError, Observable, of, Subscription } from 'rxjs';
import { IOrderDetails } from '../../shared/shared.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnDestroy {
  subscriptions: Subscription = new Subscription();
  orderId = "";
  orderData$: Observable<IOrderDetails>;
  constructor(private dataService: SharedDataService, private route: ActivatedRoute) {
    this.subscriptions.add(this.getRouterParams());
    this.orderData$ = this.dataService.getOrder(this.orderId).pipe(
      catchError(() => of({} as IOrderDetails))
    );
  }

  private getRouterParams() {
    return this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
    });
  }

  ngOnDestroy() {
    if(this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}

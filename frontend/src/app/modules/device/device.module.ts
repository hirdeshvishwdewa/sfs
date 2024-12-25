import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesRoutingModule } from './devices-routing.module';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { RealtimeBarchartComponent } from './realtime-bar-chart/realtime-bar-chart.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    DeviceDetailComponent,
    RealtimeBarchartComponent
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    TranslateModule.forChild(),
    SharedModule
  ]
})
export class DeviceModule { }

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NotificationComponent } from "./components/notification/notification.compnent";
import { HeaderComponent } from "./components/header/header.component";
import { TranslateModule } from "@ngx-translate/core";
import { DropdownComponent } from "./components/dropdow/dropdow.component";

@NgModule({
    declarations: [
        NotificationComponent,
        HeaderComponent,
        DropdownComponent
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild()
    ],
    exports: [
        NotificationComponent,
        HeaderComponent,
        DropdownComponent
    ]
})
export class CoreModule {

}
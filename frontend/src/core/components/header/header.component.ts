import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { ConfigService } from "src/app/config.service";
import { IConfig } from "src/app/modules/shared/shared.model";
import { NotificationService } from "src/core/notification.service";

@Component({
    selector: 'app-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    notification$ = this.notificationService.notifications$;
    config$: Observable<IConfig>;
    availableLanguages = ['en', 'de'];
    defaultLanguage = 'en';
    currentLanguage = this.defaultLanguage;
    constructor(private notificationService: NotificationService, private configService: ConfigService, private translate: TranslateService) {
        this.config$ = this.configService.config$;
        this.handleLanguageChange();
    }

    ngOnInit() {
        this.configService.getConfig()
    }

    changeLanguage(lang: string) {
        this.translate.use(lang);
        localStorage.setItem('selectedLanguage', lang);
    }

    private handleLanguageChange() {
        this.translate.addLangs(this.availableLanguages);
        const browserLang = this.translate.getBrowserLang();
        const savedLang = localStorage.getItem('selectedLanguage');
        this.currentLanguage = savedLang ? savedLang : browserLang?.match(/en|de/) ? browserLang : this.defaultLanguage;
        this.translate.use(this.currentLanguage);
    }
}
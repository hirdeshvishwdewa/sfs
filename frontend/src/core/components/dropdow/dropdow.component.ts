import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
    @Input()
    defaultValue = "";
    @Input()
    items: string[] = [];
    @Output()
    optionClicked = new EventEmitter<any>();

    optionClickHandler(option: any) {
        this.optionClicked.emit(option);
    }
}
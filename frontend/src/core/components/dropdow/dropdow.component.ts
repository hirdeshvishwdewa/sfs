import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html'
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
import { DefaultSizeDialog } from "../../constants/dialog";

export class DialogConfiguration {
    width: number | string;
    height: string;
    message: string;
    actions: ActionButton[];
    constructor() {
        this.message = ""
        this.actions = [];
        this.width = DefaultSizeDialog.width;
        this.height = DefaultSizeDialog.height;
    }
}

export interface ActionButton {
    message: string;
    styles: string;
    action: Function;
}

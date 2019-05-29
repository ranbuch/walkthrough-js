export interface TutorialStage {
    title?: string;
    desc: string;
    selector?: string;
    selectorIndex?: number;
    element?: HTMLElement;
    autoread?: boolean;
    fixMargin?: boolean;
    fixPadding?: boolean;
    top?: string;
    left?: string;
    onEnter?: Function;
    onExit?: Function;
}

export class TutorialOptions {
    public identifier?: string;
    public maxIdentifier?: number;
    constructor() {
        this.maxIdentifier = 1;
    }
}

export interface StorageContainer {
    identifiers: { [id: string]: IdentifiersData };
}

export interface IdentifiersData {
    counter: number;
}

export interface FormattedDim {
    size: number;
    suffix: string;
}

export interface TextToSpeechOptions {
    isHTML?: boolean;
    id?: any;
}

export class InjectStyleOptions {
    className: string;
}
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
export declare class TutorialOptions {
    identifier?: string;
    maxIdentifier?: number;
    constructor();
}
export interface StorageContainer {
    identifiers: {
        [id: string]: IdentifiersData;
    };
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
export declare class InjectStyleOptions {
    className: string;
}

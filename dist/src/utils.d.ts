import { FormattedDim, InjectStyleOptions } from './interface';
export declare class UtilsService {
    getTextContent(html: string): string;
    getFormattedDim(value: string): FormattedDim;
    scrollToElement(element: HTMLElement, block?: string): void;
    scrollTo(currentPos: number, finalPos: number, increment?: number, counter?: number, asec?: boolean): void;
    injectStyle(css: string, innerOptions?: InjectStyleOptions): HTMLStyleElement;
}

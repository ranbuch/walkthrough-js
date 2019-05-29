import { FormattedDim, InjectStyleOptions } from './interface';

export class UtilsService {
    public getTextContent(html: string): string {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent;
    }

    public getFormattedDim(value: string): FormattedDim {
        if (!value) return null;

        value = String(value);

        var returnBysuffix = (val: string, suffix: string): FormattedDim => {
            return {
                size: parseFloat(val.substring(0, val.indexOf(suffix))),
                suffix: suffix
            };
        };

        if (value.indexOf('%') > -1)
            return returnBysuffix(value, '%');
        if (value.indexOf('px') > -1)
            return returnBysuffix(value, 'px');
        if (value.indexOf('em') > -1)
            return returnBysuffix(value, 'em');
        if (value.indexOf('rem') > -1)
            return returnBysuffix(value, 'rem');
        if (value.indexOf('pt') > -1)
            return returnBysuffix(value, 'pt');
        if (value === 'auto')
            return returnBysuffix(value, '');
    }

    public scrollToElement(element: HTMLElement, block = 'start') {
        if (!element) {
            console.warn('Walkthrough: no element was provided to scroll to');
            return;
        }
        if (element.scrollIntoView) {
            const options = { behavior: 'smooth', block: block } as ScrollIntoViewOptions;
            element.scrollIntoView(options);
        }
        else {
            this.scrollTo(window.scrollY, element.offsetTop, document.body.scrollHeight / 50);
        }
    }

    public scrollTo(currentPos: number = window.scrollY, finalPos: number, increment = document.body.scrollHeight / 50, counter?: number, asec?: boolean) {
        try {
            window.scroll({
                top: finalPos,
                // left: 0,
                behavior: 'smooth'
            });
            return;
        } catch (e) { }
        counter = counter ? (counter + 1) : 1;
        asec = typeof asec === 'boolean' ? asec : currentPos > finalPos;
        if (asec)
            currentPos -= increment;
        else
            currentPos += increment;
        window.scrollTo(0, currentPos);
        if ((asec ? currentPos > finalPos : currentPos < finalPos) && counter < 50)
            setTimeout(() => {
                this.scrollTo(currentPos, finalPos, increment, counter, asec);
            }, 10);
    }

    public injectStyle(css: string, innerOptions = new InjectStyleOptions()): HTMLStyleElement {
        let sheet = document.createElement('style');
        sheet.appendChild(document.createTextNode(css));
        if (innerOptions.className)
            sheet.classList.add(innerOptions.className);
        document.body.appendChild(sheet);
        return sheet;
    }
}

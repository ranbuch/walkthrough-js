import { TutorialStage, StorageContainer, TutorialOptions } from './interface';
import { UtilsService } from './utils';
import { StorageService } from './storage';
import { TextToSpeechService } from './textToSpeech';
import { Subject } from 'rxjs';

export class Walkthrough {
    static storageContainerID = '_walkthrough';
    static readText = '►';
    static stopReadText = '◼';
    static animationDuration = 500;
    private currentStep: number;
    private steps: Array<TutorialStage>;
    private parent: HTMLElement;
    private prompt: HTMLElement;
    private curtain: HTMLElement;
    private element: HTMLElement;
    private storageContainer: StorageContainer;
    private options: TutorialOptions;
    private onEnd: Subject<boolean>;
    private tts: TextToSpeechService;
    private utils: UtilsService;
    private storage: StorageService;
    // private cssInjected: boolean;
    private style: HTMLStyleElement;
    constructor() {
        window.addEventListener('resize', this.fixElementAndPrompt.bind(this), { passive: true });

        this.utils = new UtilsService();
        this.tts = new TextToSpeechService(this.utils);
        this.storage = new StorageService();
    }

    setTutorial(steps: Array<TutorialStage>, options = new TutorialOptions()): Subject<boolean> {
        this.onEnd = new Subject<boolean>();
        this.options = options;
        this.initStorageContainer(false);
        this.injectCss();
        if (this.options.identifier) {
            if (this.storageContainer.identifiers[options.identifier].counter >= options.maxIdentifier) {
                setTimeout(() => {
                    this.onEnd.next(false);
                });
                return this.onEnd;
            }
        }
        this.steps = steps;
        this.currentStep = 0;
        this.deployStep(steps[this.currentStep]);
        return this.onEnd;
    }

    private initStorageContainer(force: boolean) {
        if (!this.storageContainer || force) {
            this.storageContainer = this.storage.get(Walkthrough.storageContainerID) as StorageContainer;
            if (typeof this.storageContainer !== 'object' || this.storageContainer === null)
                this.storageContainer = {
                    identifiers: {}
                } as StorageContainer;
        }
        if (this.options.identifier) {
            if (!this.storageContainer.identifiers[this.options.identifier])
                this.storageContainer.identifiers[this.options.identifier] = {
                    counter: 0
                };
        }
    }

    private setStorageContainer() {
        if (typeof this.storageContainer === 'object')
            this.storage.set(Walkthrough.storageContainerID, this.storageContainer);
    }

    deployStep(step: TutorialStage) {
        this.element = this.getElementByStage(step);
        if (!this.element || !this.element || !this.element.parentElement) {
            console.warn('Walkthrough: no element was provided');
            this.destroy(false);
            return;
        }
        this.parent = this.element.parentElement;
        this.parent.style.position = 'relative';
        this.element.classList.add('tutorial-element');
        if (!this.curtain) {
            this.curtain = this.getCurtain();
            this.parent.appendChild(this.curtain);
        }
        this.parent.appendChild(this.getPrompt(step));
        this.fixElementAndPrompt();
        requestAnimationFrame(() => {
            this.utils.scrollToElement(this.element, 'center');
        });
        if (step.autoread && this.tts.isSupported)
            this.toggleRead();
        if (typeof step.onEnter === 'function')
            step.onEnter();
    }

    private getElementByStage(stage: TutorialStage): HTMLElement {
        let element = stage.element;
        if (!element)
            element = document.querySelectorAll(stage.selector)[stage.selectorIndex || 0] as HTMLElement;
        return element;
    }

    private getCurtain(): HTMLElement {
        let curtain = document.createElement('div');
        curtain.className = 'tutorial-curtain';
        return curtain;
    }

    fixElementAndPrompt() {
        if (this.element) {
            let elmStyle = this.prompt.style;
            let top = -15, left = -20;
            if (this.parent && this.steps[this.currentStep].fixMargin) {
                const pcs = getComputedStyle(this.parent);
                const mb = this.utils.getFormattedDim(pcs.marginBottom);
                if (mb.suffix === 'px')
                    top += mb.size;
                const ml = this.utils.getFormattedDim(pcs.marginLeft);
                if (ml.suffix === 'px')
                    left += ml.size;
            }
            if (this.steps[this.currentStep].top)
                elmStyle.top = this.steps[this.currentStep].top;
            else
                elmStyle.top = top + 'px';
            if (this.steps[this.currentStep].left)
                elmStyle.left = this.steps[this.currentStep].left;
            else
                elmStyle.left = left + 'px';
            elmStyle.zIndex = '2005';
            elmStyle.paddingTop = (this.element.getBoundingClientRect().height + 15) + 'px';
            let w = this.element.getBoundingClientRect().width;
            if (this.steps[this.currentStep].fixPadding) {
                const elmCStyle = getComputedStyle(this.prompt);
                const paddingLeft = this.utils.getFormattedDim(elmCStyle.paddingLeft);
                if (paddingLeft && paddingLeft.size)
                    w += paddingLeft.size;
                const paddingRight = this.utils.getFormattedDim(elmCStyle.paddingRight);
                if (paddingRight && paddingRight.size)
                    w += paddingRight.size;
            }

            elmStyle.width = w + 'px';
        }
    }

    private getPrompt(step: TutorialStage): HTMLElement {
        this.prompt = document.createElement('div');
        this.prompt.className = 'tutorial-prompt';

        let inner = document.createElement('div');
        inner.className = 'tutorial-inner';
        this.prompt.appendChild(inner);


        if (step.title) {
            let title = document.createElement('span');
            title.className = 'tutorial-title';
            title.textContent = step.title;
            inner.appendChild(title);
        }

        let desc = document.createElement('p');
        desc.className = 'tutorial-desc';
        desc.innerHTML = step.desc;
        inner.appendChild(desc);

        if (this.currentStep > 0) {
            let prev = document.createElement('button');
            prev.className = 'tutorial-prev tutorial-btn';
            prev.addEventListener('click', this.prev.bind(this), false);
            prev.textContent = 'previous';
            inner.appendChild(prev);
        }

        let next = document.createElement('button');
        next.className = 'tutorial-next tutorial-btn';
        next.addEventListener('click', this.next.bind(this), false);
        next.textContent = this.currentStep < this.steps.length - 1 ? 'next' : 'done';
        inner.appendChild(next);
        requestAnimationFrame(() => {
            next.focus();
        });

        let footer = document.createElement('div');
        footer.className = 'tutorial-footer';
        inner.appendChild(footer);

        let steps = document.createElement('span');
        steps.className = 'tutorial-steps';
        steps.textContent = `step ${this.currentStep + 1} of ${this.steps.length}`;
        footer.appendChild(steps);

        let skip = document.createElement('span');
        skip.className = 'tutorial-skip';
        skip.textContent = `skip`;
        skip.addEventListener('click', this.destroy.bind(this, [false]), false);
        footer.appendChild(skip);

        if (this.tts.isSupported) {
            let read = document.createElement('button');
            read.className = 'tutorial-read';
            read.textContent = Walkthrough.readText;
            read.addEventListener('click', this.toggleRead.bind(this), false);
            footer.appendChild(read);
        }
        return this.prompt;
    }

    private removeCurrentPrompt() {
        if (this.prompt)
            this.parent.removeChild(this.prompt);
        delete this.prompt;
    }

    private removeCurrentCurtain() {
        if (this.curtain) {
            this.curtain.classList.add('end');
            setTimeout(() => {
                this.curtain.parentElement.removeChild(this.curtain);
                delete this.curtain;
            }, 500);
        }
    }

    private clearCurrentElement() {
        if (this.element && this.element)
            this.element.classList.remove('tutorial-element');
        delete this.element;
    }

    private clearCSS() {
        if (this.style && this.style.parentElement) {
            this.style.parentElement.removeChild(this.style);
        }
        delete this.style;
    }

    injectCss(force = false) {
        if (!this.style || force) {
            this.clearCSS();
            let css =
                `.tutorial-curtain {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: transparent;
                z-index: 2000;
                animation: curtain-animation ${Walkthrough.animationDuration}ms ease-out forwards;
            }
            .tutorial-curtain.end {
                animation-name: curtain-end-animation;
            }
            @keyframes curtain-animation {
                from {
                    background: transparent;
                }
                to {
                    background: rgba(0,0,0,0.7);
                }
            }
            @keyframes curtain-end-animation {
                from {
                    background: rgba(0,0,0,0.7);
                }
                to {
                    background: transparent;
                }
            }
            .tutorial-element {
                position: relative;
                background: #fff;
                z-index: 2010;
            }
            .tutorial-prompt {
                position: absolute;
                background: #fff;
                z-index: 2010;
                padding: 15px 20px;
                border-radius: 4px;
            }
            .tutorial-inner {
                padding: 10px 15px;
                background: rgba(0, 0, 0, 0.7);
                border-radius: 4px;
                margin-top: 10px;
                color: #fff;
                text-align: left;
            }
            .tutorial-title {
                text-transform: uppercase;
                margin: 0;
                font-size: 17px;
            }
            .tutorial-btn {
                border: solid 1px #000000;
                cursor: pointer;
                color: #000000;
                background: #fff;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 13px;
                text-transform: capitalize;
                display: inline-block;
            }
            .tutorial-prev {
                margin-right: 15px;
            }
            .tutorial-desc {
                font-size: 13px;
                text-transform: none;
            }
            .tutorial-footer {
                margin-top: 8px;
                padding-top: 8px;
                border-top: solid 1px rgba(255, 255, 255, 0.5);
                font-size: 11px;
            }
            .tutorial-skip {
                text-decoration: underline;
                float: right;
                cursor: pointer;
            }
            .tutorial-read {
                float: right;
                background: transparent;
                border: none;
                color: #fff;
                cursor: pointer;
                width: 22px;
                height: 16px;
                line-height: 22px;
                top: -1px;
                position: relative;
            }`;
            this.style = this.utils.injectStyle(css);
        }
    }

    onExit() {
        if (this.steps && this.steps[this.currentStep] && typeof this.steps[this.currentStep].onExit === 'function')
            this.steps[this.currentStep].onExit();
    }

    next() {
        this.removeCurrentPrompt();
        this.clearCurrentElement();
        this.onExit();
        if (++this.currentStep < this.steps.length) {
            this.tts.cancel();
            this.deployStep(this.steps[this.currentStep]);
        }
        else {
            // this.removeCurrentParent();
            this.destroy(true);
        }
    }

    prev() {
        if (this.currentStep > 0) {
            this.removeCurrentPrompt();
            this.clearCurrentElement();
            this.onExit();
            this.tts.cancel();
            this.deployStep(this.steps[--this.currentStep]);
        }
    }

    toggleRead() {
        if (!this.tts.isSupported) return;
        const step = this.steps[this.currentStep];
        if (step && this.parent && this.parent) {
            const elem = this.parent.querySelector('.tutorial-inner .tutorial-read');
            if (elem.classList.contains('active')) {
                this.tts.cancel();
                elem.textContent = Walkthrough.readText;
                elem.classList.remove('active');
            }
            else {
                let say = step.title ? step.title + ' ' : '';
                say += this.utils.getTextContent(step.desc);
                this.tts.say(say).subscribe(() => elem.textContent = Walkthrough.readText);
                elem.textContent = Walkthrough.stopReadText;
                elem.classList.add('active');
            }
        }
    }

    destroy(incrementCounter: boolean) {
        this.removeCurrentPrompt();
        this.removeCurrentCurtain();
        this.clearCurrentElement();
        this.onExit();
        this.tts.cancel();
        if (this.options && this.options.identifier && incrementCounter)
            this.storageContainer.identifiers[this.options.identifier].counter++;
        this.setStorageContainer();
        setTimeout(this.clearCSS.bind(this), Walkthrough.animationDuration);
        if (this.onEnd)
            this.onEnd.next(true);
        window.removeEventListener('resize', this.fixElementAndPrompt.bind(this));
    }
}

declare var self: any;
declare var global: any;
global = global || self;
if (global)
    global['Walkthrough'] = Walkthrough;
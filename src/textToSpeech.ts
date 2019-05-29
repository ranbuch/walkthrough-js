import { UtilsService } from './utils';
import { TextToSpeechOptions } from './interface';
import { Subject, Observable } from 'rxjs';

export class TextToSpeechService {
    public isSupported: boolean;
    private voice: any;
    private voiceURI: any;
    constructor(
        private utils: UtilsService
    ) {
        this.isSupported = 'SpeechSynthesisUtterance' in window;
    }

    public say(text: string, options: TextToSpeechOptions = {}): Observable<Object> {
        let sub = new Subject();
        if (options.isHTML)
            text = this.utils.getTextContent(text);
        if (!this.isSupported)
            sub.next(null);
        let msg = new SpeechSynthesisUtterance() as any;
        if (this.voice) {
            msg.voice = this.voice;
            if (this.voiceURI) {
                msg['voiceURI'] = this.voiceURI;
            }
        }
        msg.volume = 1; // 0 to 1
        msg.rate = 1; // 0.1 to 10
        msg.pitch = 2; // 0 to 2
        msg.text = text;
        msg.lang = 'en-US';

        msg.onend = () => {
            sub.next(options.id);
        };

        speechSynthesis.speak(msg);
        return sub;
    }

    cancel() {
        if (this.isSupported)
            speechSynthesis.cancel();
    }
}
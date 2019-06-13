import { UtilsService } from './utils';
import { TextToSpeechOptions } from './interface';
import { Observable } from 'rxjs';
export declare class TextToSpeechService {
    private utils;
    isSupported: boolean;
    private voice;
    private voiceURI;
    constructor(utils: UtilsService);
    say(text: string, options?: TextToSpeechOptions): Observable<Object>;
    cancel(): void;
}

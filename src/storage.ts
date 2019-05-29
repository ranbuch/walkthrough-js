export class StorageService {
    has(key: string): boolean {
        return window.localStorage.hasOwnProperty(key);
    }
    set(key: string, value: any): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    get(key: string): any {
        let item = window.localStorage.getItem(key);
        try {
            return JSON.parse(item);
        }
        catch (e) {
            return item;
        }
    }
    clear(): void {
        window.localStorage.clear();
    }
    remove(key: string): void {
        window.localStorage.removeItem(key);
    }
    isSupported() {
        let test = '_test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
}
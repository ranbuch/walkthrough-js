export class StorageService {
    has(key: string): boolean {
        try {
            return self.localStorage.hasOwnProperty(key);
        }
        catch (e) {
            return false;
        }
    }
    set(key: string, value: any): void {
        self.localStorage.setItem(key, JSON.stringify(value));
    }
    get(key: string): any {
        try {
            let item = window.localStorage.getItem(key);
            try {
                return JSON.parse(item);
            }
            catch (e) {
                return item;
            }
        }
        catch (e) { }
    }
    clear(): void {
        try {
            self.localStorage.clear();
        }
        catch (e) { }
    }
    remove(key: string): void {
        try {
            self.localStorage.removeItem(key);
        }
        catch (e) { }
    }
    isSupported() {
        let test = '_test';
        try {
            self.localStorage.setItem(test, test);
            self.localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
}
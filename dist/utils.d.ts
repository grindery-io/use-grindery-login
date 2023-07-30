declare global {
    interface Window {
        _hsq?: any[];
        LOQ?: any[];
    }
}
export declare const identifyUserInHubspot: (userId: string, email: string) => void;
export declare const identifyUserInLuckyOrange: (userId: string, email: string) => void;

import React from 'react';
export declare const LOGIN_URL: string;
export declare type AuthToken = {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    token_type: string;
};
export declare type GrinderyLoginContextProps = {
    /** Authentication token object */
    token: AuthToken | null;
    /** User ID */
    user: string | null;
    /** User address */
    address: string | null;
    /** Connect user */
    connect: () => void;
    /** Disconnect user */
    disconnect: () => void;
};
export declare type GrinderyLoginProviderProps = {
    children: React.ReactNode;
};
/** Grindery Nexus Context */
export declare const GrinderyLoginContext: React.Context<GrinderyLoginContextProps>;
/**
 * The component provides context for user authentication.
 *
 * It manages authentication state (token, user, address),
 * provides connect and disconnect functionality,
 * and listens for updates from a hidden iframe.
 *
 * It also exposes the context via the useGrinderyLogin hook.
 */
export declare const GrinderyLoginProvider: ({ children, }: GrinderyLoginProviderProps) => React.JSX.Element;
/** Grindery Login Hook */
export declare const useGrinderyLogin: () => GrinderyLoginContextProps;
export default GrinderyLoginProvider;

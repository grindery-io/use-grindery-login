import React, { useState, createContext, useContext, useEffect } from 'react';

export const LOGIN_URL =
  window.location.hostname.includes('-staging.grindery') ||
  window.location.hostname.includes('localhost') ||
  window.location.hostname.includes('127.0.0.1')
    ? 'https://login-staging.grindery.io'
    : 'https://login.grindery.io';

// Authentication token object definition
export type AuthToken = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  token_type: string;
};

// Context properties definition
export type GrinderyLoginContextProps = {
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

export type GrinderyLoginProviderProps = {
  children: React.ReactNode;
};

// Default context properties
const defaultContext = {
  token: null,
  address: null,
  user: null,
  connect: () => {},
  disconnect: () => {},
};

/** Grindery Nexus Context */
export const GrinderyLoginContext = createContext<GrinderyLoginContextProps>(
  defaultContext
);

/**
 * The component provides context for user authentication.
 *
 * It manages authentication state (token, user, address),
 * provides connect and disconnect functionality,
 * and listens for updates from a hidden iframe.
 *
 * It also exposes the context via the useGrinderyLogin hook.
 */
export const GrinderyLoginProvider = ({
  children,
}: GrinderyLoginProviderProps) => {
  // Authentication token object
  const [token, setToken] = useState<AuthToken | null>(null);

  // User ID
  const [user, setUser] = useState<string | null>(null);

  // User address
  const [address, setAddress] = useState<string | null>(null);

  // Connect user
  const connect = async () => {
    const currentUrl = window.location.href.split('?')[0];
    window.location.href = `${LOGIN_URL}?redirect_uri=${currentUrl}`;
  };

  // Disconnect user
  const disconnect = async () => {
    // get iframe element
    const iframe = document.getElementById(
      'grindery-login-iframe'
    ) as HTMLIFrameElement;

    // send message to iframe
    iframe.contentWindow?.postMessage(
      {
        method: 'grindery-auth-session-clear',
      },
      LOGIN_URL
    );
    setToken(null);
    setAddress(null);
    setUser(null);
  };

  // Listen for messages from the login iframe
  useEffect(() => {
    // handle message
    function handleMessage(event: any) {
      if (event.data?.method === 'grindery-auth-session') {
        // handle error
        if (event.data?.error) {
          console.log('grindery-auth-session error: ', event.data?.error);
        }

        setToken(event.data?.params?.token || null);
        setAddress(event.data?.params?.address || null);
        setUser(event.data?.params?.user || null);
      }
    }

    // add event listener
    window.addEventListener('message', handleMessage);

    // remove event listener on unmount
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <GrinderyLoginContext.Provider
      value={{
        token,
        user,
        address,
        connect,
        disconnect,
      }}
    >
      {/* Hidden iframe to handle login session */}
      <iframe
        id="grindery-login-iframe"
        title="Grindery Login Session"
        src={`${LOGIN_URL}/session`}
        style={{ display: 'none' }}
      />
      {children}
    </GrinderyLoginContext.Provider>
  );
};

/** Grindery Login Hook */
export const useGrinderyLogin = () => useContext(GrinderyLoginContext);

export default GrinderyLoginProvider;

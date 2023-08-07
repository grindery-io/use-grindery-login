import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { identifyUserInHubspot, identifyUserInLuckyOrange } from './utils';

// Grindery Engine URL
const ENGINE_URL = 'https://orchestrator.grindery.org';

// Login page URL
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

  /** User authentication loading state */
  isAuthenticating: boolean;

  /** Connect user */
  connect: () => void;

  /** Disconnect user */
  disconnect: () => void;
};

export type GrinderyLoginProviderProps = {
  children: React.ReactNode;
  loader?: React.ReactNode;
};

// Default context properties
const defaultContext = {
  token: null,
  address: null,
  user: null,
  isAuthenticating: true,
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
  loader,
}: GrinderyLoginProviderProps) => {
  // Authentication token object
  const [token, setToken] = useState<AuthToken | null>(null);

  // User ID
  const [user, setUser] = useState<string | null>(null);

  // User address
  const [address, setAddress] = useState<string | null>(null);

  // User authentication loading state
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

  // Loading state
  const [loading, setLoading] = React.useState(true);

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

  const identifyUser = useCallback(async () => {
    if (user && token?.access_token) {
      try {
        const rawResponse = await fetch(`${ENGINE_URL}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: new Date(),
            method: 'or_getUserEmail',
            params: {},
          }),
        });
        const getUserEmailResponse = await rawResponse.json();
        if (getUserEmailResponse.result) {
          identifyUserInHubspot(user, getUserEmailResponse.result);
          identifyUserInLuckyOrange(user, getUserEmailResponse.result);
        } else {
          throw new Error('No user email found');
        }
      } catch (error) {
        console.error('identifyUser error: ', error);
      }
    }
  }, [user, token]);

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

        setIsAuthenticating(false);
      }
    }

    // add event listener
    window.addEventListener('message', handleMessage);

    // remove event listener on unmount
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    identifyUser();
  }, [identifyUser]);

  useEffect(() => {
    if (!isAuthenticating) {
      setTimeout(() => {
        if (token?.access_token) {
          setLoading(false);
        } else {
          connect();
        }
      }, 1000);
    }
  }, [token, isAuthenticating, connect]);

  useEffect(() => {
    if (!token?.access_token) {
      setLoading(true);
    }
  }, [token]);

  return (
    <GrinderyLoginContext.Provider
      value={{
        token,
        user,
        address,
        isAuthenticating,
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
      {loading && loader ? loader : children}
    </GrinderyLoginContext.Provider>
  );
};

/** Grindery Login Hook */
export const useGrinderyLogin = () => useContext(GrinderyLoginContext);

export default GrinderyLoginProvider;

# Use Grindery Login

A React context provider and a hook to interact with user authentication session in React applications.

## GrinderyLoginProvider

The component defines a `GrinderyLoginContext` which is a context that provides access to user-related information and actions, including:

- The authentication token
- User ID
- User address
- Functions to connect (login) and disconnect (logout) a user

The `GrinderyLoginProvider` uses this context to hold and manage the state of these values. The component provides a mechanism for a user to login (connect) and logout (disconnect) with methods that redirect the user to different URLs depending on their environment (staging, localhost, production).

- On connecting, it redirects the user to the appropriate login URL with a `redirect_uri` parameter set to the current URL.
- On disconnecting, it posts a message to clear the authentication session and resets user-related state to null.

Additionally, `GrinderyLoginProvider` listens for messages posted from a hidden iframe sourced from the login URL, handling updates to the user's authentication session. Any such updates are used to set the context's state values.

The `GrinderyLoginProvider` component also wraps its children, thus providing the context values to all child components.

A custom hook, `useGrinderyLogin`, is also exported for easy access to the context.

## How to use

### Install library

`yarn add use-grindery-login`

or

`npm install use-grindery-login`

### Add Provider component to your React app

```js
import GrinderyLoginProvider from 'use-grindery-login';

const App = () => {
  return (
    <GrinderyLoginProvider>{/* your app components */}</GrinderyLoginProvider>
  );
};
```

### Use hook in your components to access user context

```js
import { useGrinderLogin } from 'use-grindery-login';

const AuthenticationButton = () => {
  const { connect, disconnect, token, user, address } = useGrinderyLogin();

  if (token) {
    return <button onClick={disconnect}>Disconnect</button>;
  }

  return <button onClick={connect}>Connect</button>;
};
```

## Development

See [DEVELOPMENT.md](https://github.com/grindery-io/use-grindery-login/blob/master/DEVELOPMENT.md) file.

## License

MIT License

import * as React from 'react';
import ReactDOM from 'react-dom/client';
import GrinderyLoginProvider, { useGrinderyLogin } from '../.';

declare global {
  interface Window {
    ethereum: any;
  }
}

const AuthenticationButton = () => {
  const { connect, disconnect, token, user, address } = useGrinderyLogin();

  console.log('token: ', token);
  console.log('user: ', user);
  console.log('address: ', address);

  if (token) {
    return <button onClick={disconnect}>Disconnect</button>;
  }

  return <button onClick={connect}>Connect</button>;
};

const App = () => {
  return (
    <GrinderyLoginProvider>
      <AuthenticationButton />
    </GrinderyLoginProvider>
  );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);
root.render(<App />);

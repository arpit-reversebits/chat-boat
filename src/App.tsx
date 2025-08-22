

import { useState } from 'react';
import ChatboatDashBoard from './chatboat-dash-board';
import EmailLogin from './email-login-react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Custom EmailLogin wrapper to handle login
  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  return (
    <div style={{ padding: 24 }}>
      {!isLoggedIn ? (
        <EmailLogin onLogin={handleLogin} />
      ) : (
        <>
          <h1>Chatboat Dashboard</h1>
          <ChatboatDashBoard userEmail={userEmail} />
        </>
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './styles.css'; // Import the global styles
import Register from './components/Register';
import Login from './components/Login';
import Tasks from './components/Tasks';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      {!token ? (
        <div className="container">
          <Register />
          <Login setToken={setToken} />
        </div>
      ) : (
        <Tasks token={token} />
      )}
    </div>
  );
}

export default App;

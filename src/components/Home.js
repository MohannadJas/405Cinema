import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome to Cinema App</h1>
      {!currentUser ? (
        <>
          <Link to="/login"><button>Login</button></Link>
          <Link to="/signup"><button>Signup</button></Link>
        </>
      ) : (
        <>
          <nav>
            <ul>
              <li><Link to="/movies">Movies</Link></li>
              <li><Link to="/my-list">My List</Link></li>
              <li><button onClick={logout}>Sign Out</button></li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Home;

import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import MovieList from "./components/MovieList";
import MyList from "./components/MyList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/movies" element={<PrivateRoute element={<MovieList />} />} />
            <Route path="/my-list" element={<PrivateRoute element={<MyList />} />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Cinema App</p>
        </footer>
      </div>
    </AuthProvider>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Club, Header, Footer } from './container';
import { Navbar, LoginForm } from './components';
import './App.scss';

const App = () => (
  <div className="app">
    <Router>
      {/* Navbar should be shown only on pages that are not the Login page */}
      <Routes>
        {/* Route for the LoginForm */}
        <Route path="/login" element={<LoginForm />} /> 

        {/* Wrap other components in a route for the main content */}
        <Route
          path="/"
          element={
            <>
              <Navbar />  {/* Navbar only appears on the home or other pages */}
              <Header />
              <Club />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  </div>
);

export default App;

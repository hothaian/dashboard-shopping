import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/header/Header';
import Home from './pages/Home';
import User from './pages/User';
import Sale from './pages/Sale';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/sale" element={<Sale />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

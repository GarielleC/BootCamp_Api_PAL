import React from 'react';
import { Outlet, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/navbar';
// import './App.css'

function App() {
 

  return (
    <div className="body">

    <main>
      <div className="App">
        <Navbar />
        <Outlet />
        <footer>
          <p>&copy; 2024 BooksList</p>
        </footer>
      </div>
    </main>

    </div>
  )
}

export default App;

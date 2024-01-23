import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Router/navbar';
// import './App.css'

function App() {
 

  return (
    <div className="body">

    <main>
      <div className="App">
        <Navbar />
        <Outlet />
        <footer>
          <p>&copy; 2024 ReadEase</p>
        </footer>
      </div>
    </main>

    </div>
  )
}

export default App;

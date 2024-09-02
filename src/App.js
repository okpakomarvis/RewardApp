import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';


function App() {
  return (
    <BrowserRouter>
       <Navbar />
       <main className="py-3">
        <Container>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
          </Routes>
        </Container>
      </main>
      
    </BrowserRouter>
  );
}

export default App;

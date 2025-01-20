import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import AppRoutes from './routes';
import "./styles/global.css"

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
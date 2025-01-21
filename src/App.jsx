import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import AppRoutes from './routes';
import "./styles/global.css";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1">
          <AppRoutes />
          <ToastContainer /> 
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
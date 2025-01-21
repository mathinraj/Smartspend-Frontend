import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-light text-center p-3 mt-auto">
      <p>&copy; {currentYear} Smart Spend. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
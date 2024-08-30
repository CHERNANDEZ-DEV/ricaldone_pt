import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import profile from '../assets/Rical.png';

const Principal = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#1A1A2E] text-white min-auto flex flex-col font-roboto rounded-b-3xl relative">
      <nav className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold">Ricaldone</div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </button>
        </div>
        <ul className="hidden md:flex space-x-6 lg:space-x-20">
          <li><button onClick={() => scrollToSection('home')} className="hover:text-gray-300 font-bold">Home</button></li>
          <li><button onClick={() => scrollToSection('employees')} className="hover:text-gray-300 font-bold">Talento Humano</button></li>
          <li><button onClick={() => scrollToSection('areas')} className="hover:text-gray-300 font-bold">Espacios de Trabajo</button></li>
        </ul>
        <div className="hidden md:flex space-x-3 text-white">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
        </div>
      </nav>
      {/* Mobile menu */}
      <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#001B48] z-50 flex flex-col items-center justify-center transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-4 right-4 text-3xl" onClick={() => setMenuOpen(false)}>×</button>
        <ul className="flex flex-col space-y-4 items-center">
          <li><button onClick={() => { scrollToSection('home'); setMenuOpen(false); }} className="block py-2 px-4 hover:text-gray-300">Home</button></li>
          <li><button onClick={() => { scrollToSection('services'); setMenuOpen(false); }} className="block py-2 px-4 hover:text-gray-300">Services</button></li>
          <li><button onClick={() => { scrollToSection('skills'); setMenuOpen(false); }} className="block py-2 px-4 hover:text-gray-300">Skills</button></li>
          <li><button onClick={() => { scrollToSection('education'); setMenuOpen(false); }} className="block py-2 px-4 hover:text-gray-300">Education</button></li>
        </ul>
        <div className="flex space-x-4 mt-20">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
        </div>
      </div>
      <header className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12 flex-grow">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Instituto Técnico Ricaldone</h1>
          <p className="text-base md:text-lg lg:text-xl mb-6 font-roboto">
            Enseñanza de calidad con valores cristianos.
          </p>
        </div>
        <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src={profile}
            alt="Jon Dawson"
            className="rounded-lg max-w-full h-auto"
            onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
          />
        </div>
      </header>
    </div>
  );
};

export default Principal;











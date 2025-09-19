import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Body from './components/Body.jsx';
import Footer from './components/Footer.jsx';
import hlogo from './assets/HLogo.jpg';

function App() {
  return (
    <div className='app'>
      <Header />
      <Body />
      <Footer />
    </div>
  )
}



export default App

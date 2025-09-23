import './styles/App.css';

import Header from './components/Header.jsx';
import Body from './components/Body.jsx';
import Footer from './components/Footer.jsx';

import Login from './components/Login.jsx';

function App() {
  return (
    <div className='app'>
      <Header />
      <Body />
      <Login />
      <Footer />
    </div>
  )
}

export default App

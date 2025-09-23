import '../styles/Body.css';
import hlogo from '../assets/HLogo.jpg';

function Header() {
    return (
        <>
            <header className='header'><h1>Hogwarts Finest Customer List</h1>
                <button onClick={() => console.log(`Logging in ;)`)}>Login</button>
                <img src={hlogo} alt='Logo' className='logo' />
            </header>
        </>
    )
}

export default Header;
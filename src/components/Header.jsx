import '../styles/Body.css';
import hlogo from '../assets/HLogo.png';

function Header() {
    return (
        <>
            <header className='header'><h1>Hogwarts Finest Customer List</h1>
                <img src={hlogo} alt='Logo' className='logo' />
            </header>
        </>
    )
}

export default Header;
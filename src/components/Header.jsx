import hlogo from '../assets/HLogo.jpg';

function Header() {
    return (<div><header className='header'><h1>Hogwarts Finest Customer List</h1>
        <img src={hlogo} alt='Logo' className='logo' />
    </header>
    </div>)
}

export default Header;
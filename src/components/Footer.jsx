import '../styles/Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer className='footer'>
                <hr />
                <div>
                    {currentYear} &copy; Created by Wizards' Finest <br />
                </div>
            </footer>
        </>
    )
}

export default Footer;
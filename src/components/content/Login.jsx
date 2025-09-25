import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Hardcoded admin credentials
    const ADMIN_EMAIL = 'admin@hogwarts.edu';
    const ADMIN_PASSWORD = 'magic123';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setError('');
            // Redirect to admin page or dashboard
            console.log(`Login succes ;)`);
            setIsLoggedIn(true);
            navigate('/'); // Redirect to landing page
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email-input">Email</label>
                <input
                    id="email-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="password-input">Password</label>
                <input
                    id="password-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
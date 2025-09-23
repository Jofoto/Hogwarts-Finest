import { useState } from 'react';

import '../styles/Login.css';

function Login() {
    return (
        <>
            <div className="login">
                <h2>Login</h2>
                <form>
                    <label htmlFor="email-input">Email</label>
                    <input type="email" placeholder="Email" />
                    <label htmlFor="password-input">Password</label>
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;
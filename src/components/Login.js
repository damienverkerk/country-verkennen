import React from 'react';
import '../styles/login.css';

function Login(){
    return(
        <div className='login-container'>
            <form className='login-form'>
                <label htmlFor='email'>E-mailadres:</label>
                <input type='email' id='email' name='email' required />

                <label htmlFor='password'>Wachtwoord:</label>
                <input type="password" id="password" name="password" required />

                <button type="submit">Inloggen</button>
            </form>
        </div>
    );
}
export default Login;
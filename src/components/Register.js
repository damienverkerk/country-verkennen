import React from 'react';
import '../styles/register.css';

function Register() {
    return (
        <div className='register-container'>
            <form className='register-form'>
                <label htmlFor='username'>Gebruikersnaam:</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor='email'>E-mailadres:</label>
                <input type='email' id='email' name='email' required />

                <label htmlFor='password'>Wachtwoord:</label>
                <input type='password' id='password' name='password' required />

                <button type="submit">Registreren</button>
            </form>
        </div>
    );
}
export default Register;
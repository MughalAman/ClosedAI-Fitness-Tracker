import React, { useState } from 'react';
import { getUser, getUserToken } from '../utils/api';

/**
 * Functional component for the Login page.
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.setShowSignup - Function to set the state for showing the signup page.
 * @param {Function} props.setIsLoggedIn - Function to set the state indicating whether the user is logged in.
 * @param {Function} props.setUserData - Function to set the user data.
 * @returns {JSX.Element} - JSX element representing the Login component.
 */
function Login(props) {
    const { setShowSignup, setIsLoggedIn, setUserData } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Styles for the heading.
     * @type {Object}
     */
    const headingStyle = {
        color: '#1DAEFF',
        textShadow: '0px 0px 4px rgba(0, 0, 0, 0.56)',
        fontFamily: 'Inter',
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: 900,
        lineHeight: 'normal',
        textAlign: 'center', // Center the text horizontally
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Center vertically
        minHeight: '100vh',
    };

    /**
     * Styles for the login text.
     * @type {Object}
     */
    const logintxtStyle = {
        color: '#FFF',
        fontSize: '32px',
        fontStyle: 'bold',
        fontWeight: 900,
        fontFamily: 'Inter',
        lineHeight: 'bold',
        textAlign: 'center', // Center the text horizontally
    };

    /**
     * Styles for the input fields.
     * @type {Object}
     */
    const inputStyle = {
        width: '345px',
        height: '38px',
        paddingRight: '0px',
        alignItems: 'center',
        flexShrink: 0,
        borderRadius: '5px',
        background: '#EAEAEA',
        border: 'none',
        padding: '8px',
        fontSize: '16px',
        margin: '5px 0',
    };

    /**
     * Styles for the login button.
     * @type {Object}
     */
    const buttonStyle = {
        width: '345px',
        height: '38px',
        backgroundColor: '#1DAEFF',
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '32px',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 'normal',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '20px', // Adjust the margin-top to center the button vertically
    };

    /**
     * Styles for the signup link.
     * @type {Object}
     */
    const linkStyle = {
        width: '240px',
        height: '207px',
        flexShrink: 0,
        color: '#FFF',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        fontFamily: 'Inter',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: 900,
        lineHeight: 'normal',
        textDecorationLine: 'underline',
        cursor: 'pointer',
        marginTop: '20px', // Adjust the margin-top to center the link vertically
    };

    /**
     * Handles the click event to show the signup page.
     * @param {Event} e - The click event.
     * @returns {void}
     */
    const handleShowSignup = (e) => {
        e.preventDefault();
        setShowSignup(true);
    };

    /**
     * Handles the login button click event.
     * @param {Event} e - The click event.
     * @returns {void}
     */
    const handleLogin = (e) => {
        e.preventDefault();
        getUserToken(email, password)
            .then((data) => {
                if (data) {
                    localStorage.setItem('token', data);
                    getUser(data)
                        .then((data) => {
                            if (data) {
                                setUserData(data);
                                setIsLoggedIn(true);
                            } else {
                                setIsLoggedIn(false);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div style={containerStyle}>
                <h1 style={headingStyle}>FITNESS TRACKER</h1>
                <p style={logintxtStyle}>LOGIN</p>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        style={inputStyle}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={inputStyle}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button style={buttonStyle} onClick={(e) => { handleLogin(e) }}>LOGIN</button>
                <a style={linkStyle} onClick={(e) => { handleShowSignup(e) }}>Don't have an account?</a>

                <p style={{ textAlign: 'center' }}>
                </p>
            </div>
        </div>
    );
}

export default Login;

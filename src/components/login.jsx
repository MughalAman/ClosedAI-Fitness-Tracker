import React, { useState } from 'react';
import { loginUser, getUser } from '../utils/api';

function Login(props) {
    const { setShowSignup, setIsLoggedIn, setUserData } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const logintxtStyle = {
        color: '#FFF',
        fontSize: '32px',
        fontStyle: 'bold',
        fontWeight: 900,
        fontFamily: 'Inter',
        lineHeight: 'bold',
        textAlign: 'center', // Center the text horizontally
    };

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

    const handleShowSignup = (e) => {
        e.preventDefault();
        setShowSignup(true);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(email, password)
            .then((data) => {
                if (data) {
                    localStorage.setItem('token', data.token);
                    getUser(data.token)
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

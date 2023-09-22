import React, { useState } from 'react';


function Login(props) {
    const { setShowSignup } = props;

    const headingStyle = {
        color: '#1DAEFF',
        textShadow: '0px 0px 4px rgba(0, 0, 0, 0.56)',
        fontFamily: 'Inter',
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: 900,
        lineHeight: 'normal',
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
        marginBottom: '-200px', // Keep margin-bottom for the "LOGIN" text unchanged
        marginTop: '110px', // Keep margin-top for the "LOGIN" text unchanged
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
        fontFamily: 'Roboto',
        fontSize: '32px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 'normal',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '100px', // Reduce margin-top to bring the buttons closer
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
        marginBottom: '-200px', // Keep margin-bottom for the "LOGIN" text unchanged
        marginTop: '110px', 
    };


    const handleShowSignup = (e) => {
        e.preventDefault();
        setShowSignup(true);
    };
    

    return (
        <div>
            <h1 style={headingStyle}>FITNESS TRACKER</h1>
            <p style={logintxtStyle}>LOGIN</p>

            <div style={containerStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={inputStyle}
                    />
                </div>
                <button style={buttonStyle}>LOGIN</button>
                <a style={linkStyle} onClick={(e) => {handleShowSignup(e)}}>Don't have an account?</a>

                <p style={{ textAlign: 'center' }}>
                </p>
            </div>

        </div>
    );
}

export default Login;

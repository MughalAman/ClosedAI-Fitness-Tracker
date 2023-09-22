import React, { useState } from 'react';


function Signup(props) {
    const { setShowSignup } = props;

    // Määritellään tyylit otsikolle
    const headingStyle = {
        color: '#1DAEFF',
        textShadow: '0px 0px 4px rgba(0, 0, 0, 0.56)',
        fontFamily: 'Inter',
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: 'bold', // Teksti lihavoitu
        lineHeight: 'normal',
    };

    // Määritellään tyylit sisältösäiliölle
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 10px)', // Säädettiin minHeight ottaen huomioon marginTop
        marginTop: '100px', // Lisättiin marginTop siirtämään kaikkea alaspäin 10px
    };

    // Määritellään tyylit kirjautumistekstille
    const logintxtStyle = {
        color: '#FFF',
        fontSize: '32px',
        fontWeight: 'bold', // Teksti lihavoitu
        fontFamily: 'Inter',
        marginBottom: '-200px',
        marginTop: '110px',
    };

    // Määritellään tyylit syötekentille
    const inputStyle = {
        width: '345px',
        height: '38px',
        alignItems: 'center',
        borderRadius: '5px',
        background: '#EAEAEA',
        border: 'none',
        padding: '8px',
        fontSize: '25px',
        margin: '5px 0',
        fontWeight: 'bold', // Teksti lihavoitu
    };

    // Määritellään tyylit toiselle syötekentälle
    const inputStyle2 = {
        width: '168px',
        height: '38px',
        alignItems: 'center',
        borderRadius: '5px',
        background: '#EAEAEA',
        border: 'none',
        padding: '8px',
        fontSize: '25px',
        margin: '5px',
        fontWeight: 'bold', // Teksti lihavoitu
    };

    // Määritellään tyylit painikkeelle
    const buttonStyle = {
        width: '345px',
        height: '38px',
        backgroundColor: '#1DAEFF',
        color: '#FFF',
        fontFamily: 'Roboto',
        fontSize: '32px',
        fontStyle: 'normal',
        fontWeight: 'bold', // Teksti lihavoitu
        lineHeight: 'normal',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '10px',
    };

    // Määritellään tyylit linkille
    const linkStyle = {
        width: '340px',
        height: '207px',
        color: '#FFF',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        fontFamily: 'Inter',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: 'bold', // Teksti lihavoitu
        lineHeight: 'normal',
        textDecorationLine: 'underline',
        cursor: 'pointer',
        marginBottom: '-200px',
        marginTop: '110px',
    };

    // Määritellään tyylit sukupuolipainikkeille
    const genderButtonStyle = (isSelected) => ({
        width: '38px',
        height: '38px',
        backgroundColor: isSelected ? '#808080' : '#EAEAEA',
        color: isSelected ? '#FFF' : '#000',
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 'bold', // Teksti lihavoitu
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    });

    // Määritellään tyylit sukupuolisäiliölle
    const genderContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '5px',
        marginRight: '80px',
        marginLeft: '80px',
    };

    // Määritellään tyylit sukupuolitekstille
    const genderLabelStyle = {
        marginLeft: '10px',
        fontSize: '16px',
        fontWeight: 'bold', // Teksti lihavoitu
        fontFamily: 'Inter',
        color: 'white',
    };

    // Alustetaan valittu sukupuoli
    const [selectedGender, setSelectedGender] = useState('');

    const handleShowSignup = (e) => {
        e.preventDefault();
        setShowSignup(false);
    }

    // Palautetaan komponentti
    return (
        <div>
            <h1 style={headingStyle}>FITNESS TRACKER</h1>
            <p style={logintxtStyle}>SIGN UP</p>

            <div style={containerStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Name"
                        style={inputStyle}
                    />
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
                    <input
                        type="password"
                        placeholder="Re-enter Password"
                        style={inputStyle}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={genderContainerStyle}>
                            <button 
                                style={genderButtonStyle(selectedGender === 'Male')} 
                                onClick={() => setSelectedGender('Male')}
                            />
                            <span style={genderLabelStyle}>Male</span>
                        </div>
                        <div style={genderContainerStyle}>
                            <button 
                                style={genderButtonStyle(selectedGender === 'Female')} 
                                onClick={() => setSelectedGender('Female')}
                            />
                            <span style={genderLabelStyle}>Female</span>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Birthdate mm/dd/yyyy"
                        style={inputStyle}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <input
                            type="text"
                            placeholder="Height"
                            style={inputStyle2}
                        />
                        <input
                            type="text"
                            placeholder="Weight"
                            style={inputStyle2}
                        />
                    </div>
                </div>
                <button style={buttonStyle}>Sign Up</button>
                <a style={linkStyle} onClick={(e) => {handleShowSignup(e)}}>Already have an account? Login</a>
            </div>
        </div>
    );

}

export default Signup;

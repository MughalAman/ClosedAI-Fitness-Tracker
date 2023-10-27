import { useState, useRef, useEffect  } from 'react';
import {getUser} from '../utils/api';



//lokalisaatio
import LocalizedStrings from 'react-localization';



function Profile() {
    const [unit, setUnit] = useState('kg');
    const [selectedWeightUnit, setSelectedWeightUnit] = useState(null);
    const [selectedPlate, setSelectedPlate] = useState(null);
    const [profileVisibility, setProfileVisibility] = useState('private');
    const [profilePicture, setProfilePicture] = useState('/pic.jpg'); // Set default picture path

    const [userData, setUserData] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English

    const handleLanguageChange = (e) => {
      setSelectedLanguage(e.target.value);
    };
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        handleUserLogin(token);
      }
    }, []);
  
    let strings = new LocalizedStrings({
      en: {
        FriendCode: "FriendCode",
        Name: "Name",
        Age: "Age",
        Sex: "Sex",
        Weight: "Weight",
        Height: "Height",
        ProfileVisibility: "ProfileVisibility",
        Profile: "Profile",
        Workout: "Workout settings",
        workoutMeasurment: "Weight measurement",
        smallestPlate: "Smallest plate",
        save: "Save",
      },
      tr: {
        FriendCode: "Arkadaş Kodu",
        Name: "Isim",
        Age: "Yaş",
        Sex: "Cinsiyet",
        Weight: "Kilo",
        Height: "Boy",
        ProfileVisibility: "Profil Gizliliği",
        Profile: "Profil",
        Workout: "Antrenman ayarları",
        workoutMeasurment: "Ağırlık ölçümü",
        smallestPlate: "En küçük plaka",
        save: "Kaydet",

      }
    });
    if (selectedLanguage === 'tr') {
        strings.setLanguage('tr');
      } else {
        strings.setLanguage('en');
      }
    

    const handleUserLogin = (token) => {
      getUser(token)
        .then((data) => {
          if (data) {
            setUserData(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        handleUserLogin(token);
      }
    }
    , []);

    const fileInput = useRef();  // Define the ref


    const onImageClick = () => {
        fileInput.current.click(); // Trigger the file input when the image is clicked
    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setProfilePicture(e.target.result); // Update the image src when a new file is selected
            };

            reader.readAsDataURL(e.target.files[0]); // Convert file to data URL
        }
    };
    const profileTxtStyle = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '50px',
        fontStyle: 'normal',
        fontWeight: 1000,
        lineHeight: 'normal',
        textAlign: 'left',
    };

    const profileTxtStyle1 = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '46px',
        fontStyle: 'normal',
        fontWeight: 1000,
        lineHeight: 'normal',
        textAlign: 'left',
    };

    const buttonStyle = {
        backgroundColor: '#404040',
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '40px 2px',
        transitionDuration: '0.4s',
        cursor: 'pointer',
    };

    const buttonStyleActive = {
        ...buttonStyle,
        backgroundColor: 'white',
        color: 'black',
        border: '2px solid #404040',
    };

    const radioStyle = {
        margin: '0 10px',
        marginLeft: '45px',
    };

    const labelStyle = {
        color: '#FFF',
        fontSize: '16px',
        margin: '0 10px',
        marginLeft: '45px',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        color: '#FFF',
    };

    const leftContentStyle = {
        marginRight: '20px',
        justifyContent: 'flex-start',
    };

    const rightContentStyle = {
        marginLeft: '300px',
        justifyContent: 'flex-end',lineHeight: '3',

    };

    const buttonContainerStyle = {
        textAlign: 'left',
    };

    const txtStyle = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '22px',
        fontStyle: 'normal',
        textAlign: 'left',
        fontWeight: '700',
        lineHeight: 'normal',
    };

    const leftContent = (
        <div>
            <h1 style={profileTxtStyle}>{strings.Profile}</h1>
            <h1 style={profileTxtStyle1}>{strings.Workout}</h1>
            <p style={txtStyle}>{strings.workoutMeasurment}</p>
            <div style={buttonContainerStyle}>
                <button
                    style={selectedWeightUnit === 'lbs' ? buttonStyleActive : buttonStyle}
                    onClick={() => {
                        setUnit('lbs');
                        setSelectedWeightUnit('lbs');
                    }}
                >
                    lbs
                </button>

                <button
                    style={selectedWeightUnit === 'kg' ? buttonStyleActive : buttonStyle}
                    onClick={() => {
                        setUnit('kg');
                        setSelectedWeightUnit('kg');
                    }}
                >
                    kg
                </button>
            </div>

            <p style={txtStyle}>{strings.smallestPlate}</p>
            {unit === 'kg' && (
                <>
                    {['2.5', '1.25', '1', '0.5'].map((value) => (
                        <button
                            key={value}
                            style={selectedPlate === `${value}kg` ? buttonStyleActive : buttonStyle}
                            onClick={() => setSelectedPlate(`${value}kg`)}
                        >
                            {value}kg
                        </button>
                    ))}
                </>
            )}
            {unit === 'lbs' && (
                <>
                    {['5.51', '2.76', '2.20', '1.10'].map((value) => (
                        <button
                            key={value}
                            style={selectedPlate === `${value}lbs` ? buttonStyleActive : buttonStyle}
                            onClick={() => setSelectedPlate(`${value}lbs`)}
                        >
                            {value}lbs
                        </button>
                    ))}
                </>
            )}





        </div>
    );
const saveButtonStyle = {
    width: '253px',
    height: '90px',
    flexShrink: 0,
    color: 'black',
    fontFamily: 'Inter',
    fontSize: '30px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    background: '#D9D9D9',
    marginRight: '164px',
    justifyContent: 'flex-start',
};

// ...

const textStyle = {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: '30px',
    fontStyle: 'normal',
    fontWeight: 900,
    lineHeight: '2',
    textAlign: 'center', // Center the text horizontally

};

   
    const language = (
        <div >
        <label htmlFor="languageSelect">Select Language: </label>
        <select
            id="languageSelect"
            value={selectedLanguage}
            onChange={handleLanguageChange}
        >
            <option value="en">English</option>
            <option value="tr">Turkish</option>
        </select>
        </div>
        

   );




    const rightContent = (
        <div >
          <h1 style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '45px',
                fontStyle: 'normal',
                fontWeight: 1000,
                marginBottom: '180px',
                marginTop: '-30px',
            }}>Profile information</h1>

            <img
                src={profilePicture}
                alt="Profile"
                onClick={onImageClick} // Add the onClick handler here
                style={{width: '150px', height: '150px', borderRadius: '75px', cursor: 'pointer', justifyContent: 'flex-wrap', marginLeft: '115px', marginBottom: '30px', marginTop: '-170px'}}
            />
            <input
                type="file"
                onChange={onImageChange}
                style={{display: 'none'}} // Hide the file input
                ref={fileInput} // Attach the ref here
            />

               

            <p style={textStyle}>{strings.FriendCode}: {userData.friend_code}</p>
            <p style={textStyle}>{strings.Name}: {userData.name}</p>
            <p style={textStyle}>{strings.Age}: </p>
            <p style={textStyle}>{strings.Sex}: {userData.gender}</p>
            <p style={textStyle}>{strings.Weight}: {userData.weight}</p>
            <p style={textStyle}>{strings.Height}: {userData.height}</p>
            <p style={textStyle}>{strings.ProfileVisibility}:</p>

            <input
                type="radio"
                value="private"
                checked={profileVisibility === 'private'}
                onChange={() => setProfileVisibility('private')}
                style={radioStyle}
            />
            <label style={labelStyle}>Private</label>
            <input
                type="radio"
                value="public"
                checked={profileVisibility === 'public'}
                onChange={() => setProfileVisibility('public')}
                style={radioStyle}
            />
            <label style={labelStyle}>Public</label>
        </div>
    );

    return (
        <div style={containerStyle}>
            <div style={leftContentStyle}>
                {leftContent}
                <button style={saveButtonStyle}>{strings.save}</button>
            </div>
            <div style={rightContentStyle}>
                {rightContent}
                {language}
                
                
            </div>
        </div>
    );
}

export default Profile;

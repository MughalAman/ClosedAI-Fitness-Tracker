import { useState, useRef, useEffect  } from 'react';
import {getUser} from '../utils/api';



//lokalisaatio
import LocalizedStrings from 'react-localization';


/*
//firebase profilePic
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "your-firebase-config"; // Import your Firebase Storage configuration
import { ref as dbRef, set as setDB } from "firebase/database";
import { db } from "your-firebase-database-config"; // Import your Firebase Realtime Database configuration
*/





function Profile() {
    const [unit, setUnit] = useState('kg');
    const [selectedWeightUnit, setSelectedWeightUnit] = useState(null);
    const [selectedPlate, setSelectedPlate] = useState(null);
    const [profileVisibility, setProfileVisibility] = useState('private');
    const [profilePicture, setProfilePicture] = useState('/pic.jpg'); // Set default picture path

    const [userData, setUserData] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
        localStorage.setItem('selectedLanguage', event.target.value);
    };
    useEffect(() => {
        const storedSelectedLanguage = localStorage.getItem('selectedLanguage');
       
        if (!storedSelectedLanguage) {
           fetch('/api/language')
             .then(response => response.json())
             .then(data => {
               const selectedLanguage = data.language;
               setSelectedLanguage(selectedLanguage);
               localStorage.setItem('selectedLanguage', selectedLanguage);
             });
        } else {
           setSelectedLanguage(storedSelectedLanguage);
        }
       }, []);
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        handleUserLogin(token);
      }
    }, []);
  






    // Declare a state variable for the image
const [image, setImage] = useState(null);

const handleChange = (e) => {
  if (e.target.files[0]) {
    setImage(e.target.files[0]);
  }
};
/*
// Function to upload the selected image to Firebase Storage and update user data in Realtime Database
const submitData = (userId, username, email) => {
  if (image) {
    const storageRef = ref(storage, "images/" + image.name);

    uploadBytes(storageRef, image)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!');
        // You can also get the download URL for the uploaded file here if needed
        getDownloadURL(storageRef)
          .then((url) => {
            // Update the user data in Firebase Realtime Database
            setDB(dbRef(db, 'users/' + userId), {
              username: username,
              email: email,
              profile_picture: url // Use the retrieved URL here
            });
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
          });
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  } else {
    console.error('No image selected for upload');
  }
};


*/







    let strings = new LocalizedStrings({
      en: {
        profileinformation: "Profile information",
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
        selectLanguage: "Select Language",
      },
      tr: {
        profileinformation: "Profil bilgileri",
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
        selectLanguage: "Dil Seçiniz",

      },
        ru: {
        profileinformation: "Информация профиля",
        FriendCode: "Код друга",
        Name: "Имя",
        Age: "Возраст",
        Sex: "Пол",
        Weight: "Вес",
        Height: "Рост",
        ProfileVisibility: "Видимость профиля",
        Profile: "Профиль",
        Workout: "Настройки тренировки",
        workoutMeasurment: "Измерение веса",
        smallestPlate: "Самая маленькая гиря",
        save: "Сохранить",
        selectLanguage: "Выберите язык",

        }
    });
    if (selectedLanguage === 'tr') {
        strings.setLanguage('tr');
      } else if (selectedLanguage === 'en') {
        strings.setLanguage('en');
      } else {
        strings.setLanguage('ru');
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
  
    async function getLanguage() {
        const token = localStorage.getItem('token');
      
        if (token) {
          const response = await getUser(token);
      
          if (response && response.extra_data) {
            const lang = response.extra_data.lang;
            console.log(lang);
            return lang; // Return the language directly
          }
        }
      
        return 'defaultLanguage'; // Provide a default language in case of errors
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
        <label htmlFor="languageSelect">{strings.selectLanguage}: </label>
        <select
            id="languageSelect"
            value={selectedLanguage}
            onChange={handleLanguageChange}
        >
            <option value="en">English</option>
            <option value="tr">Turkish</option>
            <option value="ru">Russian</option>
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
            }}>{strings.profileinformation}</h1>

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

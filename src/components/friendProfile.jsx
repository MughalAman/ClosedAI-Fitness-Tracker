import React, { useState } from 'react';
import PreviousWorkout2 from './PreviousWorkout2';
import LocalizedStrings from 'react-localization';

function FriendProfile(props) {
    const [profilePicture, setProfilePicture] = useState('/pic.jpg');

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
          profile: "Profile",
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
          profile: "Profil",
  
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
          profile: "Профиль",
          }
      });
      if (selectedLanguage === 'tr') {
          strings.setLanguage('tr');
        } else if (selectedLanguage === 'en') {
          strings.setLanguage('en');
        } else {
          strings.setLanguage('ru');
        }









    const profileTxtStyle = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '50px',
        fontWeight: 1000,
        textAlign: 'left',
    };

    const profileTxtStyle1 = {
        ...profileTxtStyle,
        fontSize: '46px',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        color: '#FFF',
    };

    const leftContentStyle = {
        marginRight: '20px',
    };

    const rightContentStyle = {
        marginTop: '50px',
        marginLeft: '600px',
        lineHeight: '3',
    };

    const textStyle = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '30px',
        fontWeight: 900,
        lineHeight: '2',
        marginLeft: '10px',
        textAlign: 'center',

    };
    
    
    return (
        <div style={containerStyle}>
            <div style={leftContentStyle}>
                <h1 style={profileTxtStyle}>Juha's {strings.profile}</h1>
                <h1 style={profileTxtStyle1}>{strings.profileinformation}</h1>
                <PreviousWorkout2 />
            </div>
            <div style={rightContentStyle}>
                <h1 style={{ fontSize: '45px', marginBottom: '180px', marginTop: '-30px', fontFamily: 'Inter', fontWeight: 900 }}>Profile information</h1>
                <img 
                    src={profilePicture} 
                    alt="Profile" 
                    style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '75px',
                        cursor: 'pointer',
                        marginLeft: '115px',
                        marginBottom: '30px',
                        marginTop: '-170px'
                    }}
                />
                <p style={textStyle}>{strings.FriendCode}: {userData.friend_code}</p>
                <p style={textStyle}>{strings.Name}: {userData.name}</p>
                <p style={textStyle}>{strings.Age}: </p>
                <p style={textStyle}>{strings.Sex}: {userData.gender}</p>
                <p style={textStyle}>{strings.Weight}: {userData.weight}</p>
                <p style={textStyle}>{strings.Height}: {userData.height}</p>
            </div>
        </div>
    );
}

export default FriendProfile;

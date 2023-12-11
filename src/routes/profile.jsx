import { useState, useRef, useEffect } from 'react';
import { getUser, updateUserProfilePicUrl, updateUserData } from '../utils/api';
import { storage } from "../firebase-config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
import localizationData from '../assets/localization.json';

//lokalisaatio
import LocalizedStrings from 'react-localization';

/**
 * Functional component representing the user profile settings.
 * @component
 * @returns {JSX.Element} - JSX element representing the Profile component.
 */
function Profile() {
    const [unit, setUnit] = useState('kg');
    const [selectedWeightUnit, setSelectedWeightUnit] = useState(null);
    const [selectedPlate, setSelectedPlate] = useState(null);
    const [profileVisibility, setProfileVisibility] = useState('private');
    const [profilePicture, setProfilePicture] = useState('/pic.jpg'); // Set default picture path

    const [userData, setUserData] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');

    /**
    * Handles the language selection change and updates user data.
    * @function
    * @param {Object} event - The event object representing the language change.
    * @returns {void}
    */
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
        localStorage.setItem('selectedLanguage', event.target.value);
        updateUserData(localStorage.getItem('token'), { extra_data: { lang: event.target.value } })
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

    const [strings, setStrings] = useState(new LocalizedStrings(localizationData));

    useEffect(() => {
        async function fetchData() {
            const lang = selectedLanguage; // Call the getLanguage function
            setSelectedLanguage(lang); // Set the selected language based on the result
            setStrings(prevStrings => {
                const newStrings = new LocalizedStrings(localizationData);
                newStrings.setLanguage(lang);
                return newStrings;
            });
        }

        fetchData();
    }, []);

    if (selectedLanguage === 'tr') {
        strings.setLanguage('tr');
    } else if (selectedLanguage === 'en') {
        strings.setLanguage('en');
    } else {
        strings.setLanguage('ru');
    }

    /**
   * Handles the user login and fetches user data.
   * @async
   * @function
   * @param {string} token - User authentication token.
   * @returns {void}
   */
    const handleUserLogin = async (token) => {
        try {
            const data = await getUser(token);
            if (data) {
                setUserData(data);
                if (data.profile_pic_url) {
                    setProfilePicture(data.profile_pic_url);
                }
            }
        } catch (err) {
            console.log(err);
        }
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
            const token = localStorage.getItem('token');
            const imageRef = ref(storage, `images/${e.target.files[0].name + v4()}`);

            uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    updateUserProfilePicUrl(downloadURL, token).then(() => {
                        setProfilePicture(downloadURL);
                    });
                });
            });
        }
    };

    const saveData = () => {
        updateUserData(localStorage.getItem('token'), { extra_data: { "visibility": profileVisibility } });
    }

    const calculateAgeFromDateOfBirth = (dateOfBirth) => {
        // The date of birth may be in the format of "YYYY-MM-DD"
        // Split the string to get the year, month and day
        const dateOfBirthArray = dateOfBirth.split('-');
        const year = dateOfBirthArray[0];
        const month = dateOfBirthArray[1];
        const day = dateOfBirthArray[2];

        // Get the current date
        const currentDate = new Date();

        // Get the current year, month and day
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        // Calculate the age
        let age = currentYear - year;

        // If the current month is before the birth month, the age is one year less
        if (currentMonth < month) {
            age--;
        }

        // If the current month is the same as the birth month, but the current day is before the birth day, the age is one year less
        if (currentMonth === month && currentDay < day) {
            age--;
        }

        return age;
    }

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
        marginLeft: '20px',
        width: '25px',
        height: '25px',
    };

    const labelStyle = {
        color: '#FFF',
        fontSize: '32px',
        margin: '0 10px',
        marginLeft: '10px',
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column', // Change the flex direction to column
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center', // Center items vertically
        color: '#FFF',
        fontFamily: 'Inter',
    };

    const leftContentStyle = {
        marginRight: '20px',
        justifyContent: 'flex-start',
    };

    const rightContentStyle = {
        marginLeft: '300px',
        justifyContent: 'flex-end', lineHeight: '3',

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

    /**
   * Renders the left content of the profile settings.
   * @returns {JSX.Element} - JSX element representing the left content.
   */
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
        marginRight: '10px',
        justifyContent: 'flex-start',
        float: 'right',
        borderRadius: '10px',
    };

    const textStyle = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: 900,
        textAlign: 'center', // Center the text horizontally
    };

    const languageSelectStyle = {
        width: '120px',
        height: '50px',
        alignItems: 'center',
        borderRadius: '5px',
        background: 'black',
        border: 'none',
        padding: '8px',
        fontSize: '25px',
        margin: '5px 0',
        fontWeight: 'bold', // Teksti lihavoitu
    };

    const languageContainerStyle = {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'row',
    };

    const selectedLanguageStyle = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: 900,
        lineHeight: '2',
        textAlign: 'center', // Center the text horizontally
    };

    const logoutButtonStyle = {
        width: '253px',
        height: '90px',
        flexShrink: 0,
        color: 'black',
        fontFamily: 'Inter',
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal',
        borderRadius: '10px',
        background: '#D9D9D9', // You can customize the color
        marginRight: '10px',
        marginBottom: '20px', // Add some bottom margin to separate from other buttons
    };

    const backButtonStyle = {
        ...logoutButtonStyle,
        background: '#D9D9D9', // You can customize the color
    };

    const language = (
        <div >
            <label htmlFor="languageSelect" style={selectedLanguageStyle}>{strings.selectlanguage}: </label>
            <select
                id="languageSelect"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                style={languageSelectStyle}
            >
                <option value="en">{strings.english}</option>
                <option value="tr">{strings.turkish}</option>
                <option value="ru">{strings.russian}</option>
            </select>
        </div>
    );

    const logout = () => {
        localStorage.clear(); // Clear all items from local storage
        window.location.href = '/'; // Redirect to the home page
    };

    const goToQuestionnaire = () => {
        window.location.href = '/trainingexperience'; // Redirect to the questionnaire page
    };

    const logoutButton = (
        <button style={logoutButtonStyle} onClick={logout}>
            Log out
        </button>
    );

    const backButton = (
        <button style={backButtonStyle} onClick={goToQuestionnaire}>
            Go back to questionnaire
        </button>
    );

    const backButtonToMain = (
        <button style={backButtonStyle} onClick={() => window.location.href = '/'}>
            Back to Main Page
        </button>
    );

    /**
   * Renders the right content of the profile settings.
   * @returns {JSX.Element} - JSX element representing the right content.
   */
    const rightContent = (
        <div >
            <h1 style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '45px',
                fontStyle: 'normal',
                fontWeight: 1000,
                marginBottom: '180px',
                marginTop: '30px',
            }}>{strings.profileinformation}</h1>

            <img
                src={profilePicture}
                alt="Profile"
                onClick={onImageClick} // Add the onClick handler here
                style={{ width: '150px', height: '150px', borderRadius: '75px', cursor: 'pointer', justifyContent: 'flex-wrap', marginLeft: '115px', marginBottom: '30px', marginTop: '-170px' }}
            />
            <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={onImageChange}
                style={{ display: 'none' }} // Hide the file input
                ref={fileInput} // Attach the ref here
            />

            <p style={textStyle}>{strings.FriendCode}: {userData.friend_code}</p>
            <p style={textStyle}>{strings.Name}: {userData.name}</p>
            <p style={textStyle}>{strings.Age}: {userData.birth_date ? calculateAgeFromDateOfBirth(userData.birth_date) : "N/A"}</p>
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
            <label style={labelStyle}>{strings.private}</label>
            <input
                type="radio"
                value="public"
                checked={profileVisibility === 'public'}
                onChange={() => setProfileVisibility('public')}
                style={radioStyle}
            />
            <label style={labelStyle}>{strings.public}</label>
        </div>
    );

    return (
        <div style={containerStyle}>
            {rightContent}
            <div style={languageContainerStyle}>
                {language}
            </div>
            <div style={languageContainerStyle}>
                <button style={saveButtonStyle} onClick={saveData}>
                    {strings.save}
                </button>
                {logoutButton}
                {backButton}
                {backButtonToMain}
            </div>
        </div>
    );
}

export default Profile;

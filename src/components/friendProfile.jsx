import { useState, useEffect } from "react";
import PreviousWorkouts from "./PreviousWorkouts";
import LocalizedStrings from "react-localization";
import { getUserFromUserId, getLanguage } from "../utils/api";
import { useParams } from "react-router-dom";
import localizationData from '../assets/localization.json';

/**
 * React component for displaying a friend's profile information.
 * @module FriendProfile
 * @component
 * @default
 */
function FriendProfile() {

  /**
   * State for storing the friend's data.
   * @type {[Object, function]}
   */
  const [friendData, setFriendData] = useState(null);

  /**
   * React Router hook to get the user ID parameter from the URL.
   * @type {Object}
   */
  const { id } = useParams();

  /**
   * Effect hook to fetch the friend's data based on the user ID.
   * @function
   * @param {string} id - User ID parameter from the URL.
   */
  useEffect(() => {
    getUserFromUserId(id).then((data) => {
      setFriendData(data);
    });
  }, [id]);

  /**
   * State for the selected language.
   * @type {[string, function]}
   */
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );

  /**
   * Event handler for changing the selected language.
   * @function
   * @param {Object} event - The change event.
   */
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    localStorage.setItem("selectedLanguage", event.target.value);
  };

  /**
   * Effect hook to initialize the selected language.
   * @function
   */
  useEffect(() => {
    const storedSelectedLanguage = localStorage.getItem("selectedLanguage");

    if (!storedSelectedLanguage) {
      fetch("/api/language")
        .then((response) => response.json())
        .then((data) => {
          const selectedLanguage = data.language;
          setSelectedLanguage(selectedLanguage);
          localStorage.setItem("selectedLanguage", selectedLanguage);
        });
    } else {
      setSelectedLanguage(storedSelectedLanguage);
    }
  }, []);

  /**
   * State for localized strings using the selected language.
   * @type {[Object, function]}
   */
  const [strings, setStrings] = useState(new LocalizedStrings(localizationData));

  /**
   * Effect hook to fetch data and set localized strings based on the selected language.
   * @function
   */
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

  // Set the language based on the selectedLanguage state
  if (selectedLanguage === "tr") {
    strings.setLanguage("tr");
  } else if (selectedLanguage === "en") {
    strings.setLanguage("en");
  } else {
    strings.setLanguage("ru");
  }

  const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  /**
   * Styles for the profile text.
   * @type {Object}
   */
  const profileTxtStyle = {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: "50px",
    fontWeight: 1000,
    textAlign: "left",
  };

  /**
   * Styles for the smaller profile text.
   * @type {Object}
   */
  const profileTxtStyle1 = {
    ...profileTxtStyle,
    fontSize: "46px",
  };

  /**
   * Styles for the main container.
   * @type {Object}
   */
  const containerStyle = {
    display: "flex",
    justifyContent: "flex-start",
    color: "#FFF",
  };

  /**
   * Styles for the left content.
   * @type {Object}
   */
  const leftContentStyle = {
    marginRight: "20px",
  };

  /**
   * Styles for the right content.
   * @type {Object}
   */
  const rightContentStyle = {
    marginTop: "50px",
    marginLeft: "600px",
    lineHeight: "3",
  };

  /**
   * Styles for the text.
   * @type {Object}
   */
  const textStyle = {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: "30px",
    fontWeight: 900,
    lineHeight: "2",
    marginLeft: "10px",
    textAlign: "center",
  };

  /**
   * Function to calculate age from the date of birth.
   * @function
   * @param {Date} dateOfBirth - The date of birth.
   * @returns {number} The calculated age.
   */
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

  /**
   * JSX representing the FriendProfile component.
   * @returns {JSX.Element|null} JSX element representing the FriendProfile component or null if friendData is not available.
   */
  return (
    friendData && (
      <div style={containerStyle}>
        <div style={leftContentStyle}>
          <h1 style={profileTxtStyle}>
            {friendData.name} {strings.profile}
          </h1>
          <h1 style={profileTxtStyle1}>{strings.profileinformation}</h1>
          <PreviousWorkouts userData={friendData} showAsColumn={true} />
        </div>
        <div style={rightContentStyle}>
          <h1
            style={{
              fontSize: "45px",
              marginBottom: "180px",
              marginTop: "-30px",
              fontFamily: "Inter",
              fontWeight: 900,
            }}
          >
            Profile information
          </h1>
          <img
            src={friendData.profile_pic_url ? friendData.profile_pic_url : '../pic.jpg'}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "75px",
              marginLeft: "115px",
              marginBottom: "30px",
              marginTop: "-170px",
            }}
          />
          <p style={textStyle}>
            {strings.FriendCode}: {friendData.friend_code}
          </p>
          <p style={textStyle}>
            {strings.Name}: {friendData.name}
          </p>
          <p style={textStyle}>{strings.Age}: {friendData.birth_date ? calculateAgeFromDateOfBirth(friendData.birth_date) : "N/A"}</p>
          <p style={textStyle}>
            {strings.Sex}: {friendData.gender}
          </p>
          <p style={textStyle}>
            {strings.Weight}: {friendData.weight}
          </p>
          <p style={textStyle}>
            {strings.Height}: {friendData.height}
          </p>
        </div>
      </div>
    )
  );
}

export default FriendProfile;

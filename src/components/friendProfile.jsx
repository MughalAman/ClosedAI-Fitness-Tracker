import { useState, useEffect } from "react";
import PreviousWorkouts from "./PreviousWorkouts";
import LocalizedStrings from "react-localization";
import { getUserFromUserId } from "../utils/api";
import { useParams } from "react-router-dom";
import localizationData from '../assets/localization.json';

function FriendProfile() {
  const [friendData, setFriendData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getUserFromUserId(id).then((data) => {
      setFriendData(data);
    });
  }, [id]);

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    localStorage.setItem("selectedLanguage", event.target.value);
  };

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

  const [strings, setStrings] = useState(new LocalizedStrings(localizationData));

  useEffect(() => {
    async function fetchData() {
        const lang = await getLanguage(); // Call the getLanguage function
        setSelectedLanguage(lang); // Set the selected language based on the result
        setStrings(prevStrings => {
            const newStrings = new LocalizedStrings(localizationData);
            newStrings.setLanguage(lang);
            return newStrings;
        });
    }

    fetchData();
}, []);




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

  const profileTxtStyle = {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: "50px",
    fontWeight: 1000,
    textAlign: "left",
  };

  const profileTxtStyle1 = {
    ...profileTxtStyle,
    fontSize: "46px",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "flex-start",
    color: "#FFF",
  };

  const leftContentStyle = {
    marginRight: "20px",
  };

  const rightContentStyle = {
    marginTop: "50px",
    marginLeft: "600px",
    lineHeight: "3",
  };

  const textStyle = {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: "30px",
    fontWeight: 900,
    lineHeight: "2",
    marginLeft: "10px",
    textAlign: "center",
  };

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

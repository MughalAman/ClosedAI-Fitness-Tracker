import { useState, useEffect } from "react";
import PreviousWorkouts from "./PreviousWorkouts";
import LocalizedStrings from "react-localization";
import { getUserFromUserId } from "../utils/api";
import { useParams } from "react-router-dom";

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
    },
  });
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
            src={friendData.profile_picture_url || "../pic.jpg"}
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
          <p style={textStyle}>{strings.Age}: 20</p>
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

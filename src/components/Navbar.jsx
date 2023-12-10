import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { createFriendship, getUserIdFromFriendcode, getUserFriendships, updateFriendship, getLanguage } from '../utils/api';
import LocalizedStrings from 'react-localization';
import localizationData from '../assets/localization.json';

const navbarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#0F0E0E',
  height: '100px',
  width: '100%', // Set the width to 100% to span the entire screen
  color: 'white',
  fontFamily: 'Inter, sans-serif',
  borderRadius: '4px',
};

const searchContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid white',
  backgroundColor: '#404040',
};

const inputStyles = {
  backgroundColor: '#404040',
  padding: '8px',
  outline: 'none',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'Inter',
  width: '398px',
};

const iconStyles = {
  color: 'black',
  marginRight: '0px',
  cursor: 'pointer',
};

const boldText = {
  fontWeight: 'bold',
  color: 'white',
};

const imageStyles = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  cursor: 'pointer',
  marginRight: '4px',
};

function Navbar(props) {
  const [searchText, setSearchText] = useState('');
  const { userData } = props;

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

  if (selectedLanguage === 'tr') {
    strings.setLanguage('tr');
  } else if (selectedLanguage === 'en') {
    strings.setLanguage('en');
  } else {
    strings.setLanguage('ru');
  }

  const handleSearchClick = () => {
    handleAddFriend();
    setSearchText('');
  };

  const handleAddFriend = async () => {
    // Check if the user is trying to add themselves
    if (userData.friend_code === searchText) {
      alert(strings.frienderror);
      return;
    }

    // Check for existing friendships
    let existingFriendships = await getUserFriendships(userData.user_id);

    // Get the user id of the friend
    let friendId = await getUserIdFromFriendcode(searchText);

    console.log('Friend id:', friendId);

    // Check if the user is trying to add friend that has already sent them a friend request
    for (let i = 0; i < existingFriendships.length; i++) {
      if (existingFriendships[i].user_id === friendId && existingFriendships[i].friend_id === userData.user_id) {
        if (existingFriendships[i].status_id === 1) {
          alert(strings.alrfriend);
          updateFriendship(existingFriendships[i].friendship_id, 2)
            .then(() => {
              alert(strings.friendrequest);
            })
            .catch((error) => {
              console.error('Error accepting friend request:', error);
            });
          return;
        }
        else if (existingFriendships[i].status_id === 2) {
          alert(strings.alrfriend2);
          return;
        }
      }
    }

    // Check if the user is trying to add a friend they already have or if the friend code is invalid or if the friendship status is 0 (pending) or 1 (accepted)
    for (let i = 0; i < existingFriendships.length; i++) {
      console.log('Friendship:', existingFriendships[i]);
      if (existingFriendships[i].friend_id === friendId) {
        if (existingFriendships[i].status_id === 1) {
          alert(strings.friendrequest2);
          return;
        } else if (existingFriendships[i].status_id === 2) {
          alert(strings.alrfriend2);
          return;
        }
      }
    }

    // Handle new friendship creation
    await createFriendship(userData.user_id, friendId, 1)
      .then(() => {
        alert(strings.friendsent);
      })
      .catch((error) => {
        console.error('Error creating friendship:', error);
      });
  };

  return (
    <nav style={navbarStyles}>
      <div style={searchContainerStyles}>
        <div style={inputStyles}>
          <FontAwesomeIcon
            icon={faSearch}
            style={iconStyles}
            onClick={handleSearchClick}
          />
          <input
            type="text"
            placeholder={strings.addfriend}
            style={{
              ...inputStyles,
              paddingLeft: '5px',
              ...boldText,
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchClick();
              }
            }
            }
          />
        </div>
      </div>
      <div>
        <a href="/profile">
          <img
            src={userData.profile_pic_url ? userData.profile_pic_url : '../pic.jpg'}
            alt="Profile"
            style={imageStyles}
          />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;

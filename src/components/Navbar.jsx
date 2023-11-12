import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {createFriendship, getUserIdFromFriendcode, getUserFriendships, updateFriendship} from '../utils/api';


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
  const {userData} = props;

  const handleSearchClick = () => {
    // Handle search functionality here with the searchText state
    alert('Searching for: ' + searchText); // Replace with your actual search logic
  };

  const handleAddFriend = async () => {
    // Check if the user is trying to add themselves
    if (userData.friend_code === searchText) {
      alert("You can't add yourself as a friend!");
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
          alert('You already have a friend request from this user! Accepting the request...');
          updateFriendship(existingFriendships[i].friendship_id, 2)
          .then(() => {
            alert('Friend request accepted!');
          })
          .catch((error) => {
            console.error('Error accepting friend request:', error);
          });
          return;
        }
        else if (existingFriendships[i].status_id === 2) {
          alert('You are already friends with this user!');
          return;
        }
      }
    }


    // Check if the user is trying to add a friend they already have or if the friend code is invalid or if the friendship status is 0 (pending) or 1 (accepted)
    for (let i = 0; i < existingFriendships.length; i++) {
      console.log('Friendship:', existingFriendships[i]);
      if (existingFriendships[i].friend_id === friendId) {
        if (existingFriendships[i].status_id === 1) {
          alert('Friend request already sent!');
          return;
        } else if (existingFriendships[i].status_id === 2) {
          alert('You are already friends with this user!');
          return;
        }
      }
    }



    // Handle new friendship creation
    await createFriendship(userData.user_id, friendId, 1)
    .then(() => {
      alert('Friend request sent!');
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
            placeholder="Add Friend"
            style={{
              ...inputStyles,
              paddingLeft: '5px',
              ...boldText,
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddFriend();
                setSearchText('');
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

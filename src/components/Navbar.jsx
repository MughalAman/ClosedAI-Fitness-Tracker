import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {createFriendship, getFriendship, updateFriendship} from '../utils/api';


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

  const handleAddFriend = () => {
    // Check if the user is trying to add themselves
    if (userData.friend_code === searchText) {
      alert("You can't add yourself as a friend!");
      return;
    }
  
    // Check for existing friendships in both requested and received arrays
    const existingFriendshipRequested = userData.friendships_requested.find(
      (f) => f.user2.friend_code === searchText
    );
    const existingFriendshipReceived = userData.friendships_received.find(
      (f) => f.user1.friend_code === searchText
    );
  
    // Handle existing friendships
    if (existingFriendshipRequested) {
      alert('You have already sent a friend request to this user.');
      return;
    } else if (existingFriendshipReceived) {
      if (existingFriendshipReceived.status === 'pending') {
        updateFriendship(existingFriendshipReceived.user1_id, existingFriendshipReceived.user2_id, 'accepted')
          .then(() => {
            alert('Friend request accepted!');
            // Update UI or state as needed
          })
          .catch((error) => {
            console.error('Error updating friendship:', error);
          });
      } else {
        alert('You are already friends.');
      }
      return;
    }
  
    // Handle new friendship creation
    createFriendship(userData.friend_code, searchText)
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
            src="../screenshot-202309051321371.png"
            alt="Profile"
            style={imageStyles}
          />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;

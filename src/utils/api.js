/**
 * Creates a new user.
 * @async
 * @function
 * @param {string} name - User's name.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {string} weight - User's weight.
 * @param {string} height - User's height.
 * @param {string} gender - User's gender.
 * @param {string} birth_date - User's birth date.
 * @throws {Error} Throws an error if the request fails.
 * @returns {Promise<Object>} A promise that resolves to the created user data.
 */
async function createUser(name, email, password, weight, height, gender, birth_date) {
  try {
    const response = await fetch('https://fitness-api-wlzk.onrender.com/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        height,
        weight,
        gender,
        birth_date
      }),
    });
    if (response.status === 200) {
      console.log('User created');
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

/**
 * Updates user data with new information.
 * @async
 * @function
 * @param {string} token - User authentication token.
 * @param {Object} newData - New data to update.
 * @throws {Error} Throws an error if the API request fails.
 * @returns {Promise<void>} Returns a promise that resolves when the update is successful.
 */
async function updateUserData(token, newData) {
  try {
    // Fetch the existing user data
    const existingUserData = await getUser(token);

    console.log('Existing User Data:', existingUserData.extra_data);

    // Parse the existing extra_data string into an object
    const existingExtraData = existingUserData.extra_data;

    console.log('Existing Extra Data:', existingExtraData);

    // Merge the existing extra_data with the new data
    const updatedExtraData = {
      ...existingExtraData,
      ...newData.extra_data,
    };

    console.log('Updated Extra Data:', updatedExtraData);

    // Update the user data with the updated extra_data
    const updatedUserData = {
      ...existingUserData,
      extra_data: updatedExtraData,
    };

    console.log('Updated User Data:', updatedUserData);

    const response = await fetch('https://fitness-api-wlzk.onrender.com/user/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) {
      console.error('Failed to save questionnaire data');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * Retrieves a user authentication token.
 * @async
 * @function
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @throws {Error} Throws an error if login fails or the API request fails.
 * @returns {Promise<string>} Returns a promise that resolves to the user's authentication token.
 */
async function getUserToken(email, password) {
  try {
    const response = await fetch('https://fitness-api-wlzk.onrender.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${email}&password=${password}`,
    });

    console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      return data?.access_token;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

/**
 * Retrieves user data based on the authentication token.
 * @async
 * @function
 * @param {string} token - User authentication token.
 * @throws {Error} Throws an error if the API request fails.
 * @returns {Promise<Object>} Returns a promise that resolves to the user data.
 */
function getUser(token) {
  return fetch('https://fitness-api-wlzk.onrender.com/user/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/**
 * Retrieves a user ID based on the provided friend code.
 * @async
 * @function
 * @param {string} friendcode - Friend code used to identify a user.
 * @throws {Error} Throws an error if the API request fails.
 * @returns {Promise<Object>} Returns a promise that resolves to user data based on the friend code.
 */
async function getUserIdFromFriendcode(friendcode) {
  try {
    const response = await fetch(`https://fitness-api-wlzk.onrender.com/users/fc/${friendcode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

/**
 * Retrieves user data based on the user ID.
 * @async
 * @function
 * @param {string} userId - User ID used to identify a user.
 * @throws {Error} Throws an error if the API request fails.
 * @returns {Promise<Object>} Returns a promise that resolves to user data based on the user ID.
 */
async function getUserFromUserId(userId) {
  try {
    const response = await fetch(`https://fitness-api-wlzk.onrender.com/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

/**
 * Updates the user's profile picture URL.
 * @async
 * @function
 * @param {string} url - New profile picture URL.
 * @param {string} token - User authentication token.
 * @throws {Error} Throws an error if the API request fails.
 * @returns {Promise<Object>} Returns a promise that resolves when the update is successful.
 */
async function updateUserProfilePicUrl(url, token) {
  return fetch('https://fitness-api-wlzk.onrender.com/user/', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "profile_pic_url": url,
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

async function setUserLanguage(id, lang) {
  try {
    const data = await getUser(id);
    const updatedUserData = {
      name: data?.name,
      email: data?.email,
      height: data?.height,
      weight: data?.weight,
      gender: data?.gender,
      extra_data: { "lang": lang },
    };
    const result = await setWorkout(id, updatedUserData);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getLanguage() {
  try {
    const response = localStorage.getItem('token') ? await getUser(localStorage.getItem('token')) : undefined;
    const lang = response?.extra_data?.lang;
    console.log(lang);
    return lang ? lang : 'en';
  } catch (error) {
    console.error('Error getting language:', error);
    // Handle error
    return undefined;
  }
}


function createWorkout(name = "NAME", dates = [], userId) {
  return fetch('https://fitness-api-wlzk.onrender.com/workout/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "name": name,
      "dates": dates,
      "user_id": userId
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function setWorkout(id, workoutData) {
  return fetch(`https://fitness-api-wlzk.onrender.com/workout/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(workoutData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function getWorkout(id) {
  return fetch(`https://fitness-api-wlzk.onrender.com/workout/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

async function updateWorkout(id, workoutData) {
  try {
    const data = await getWorkout(id);
    const updatedWorkoutData = {
      name: workoutData.name !== undefined ? workoutData.name : data.name,
      dates: workoutData.dates !== undefined ? workoutData.dates : data.dates,
      user_id: workoutData.user_id !== undefined ? workoutData.user_id : data.user_id
    };
    const result = await setWorkout(id, updatedWorkoutData);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

function createExercise(name = "NAME", description = "DESCRIPTION", url = "URL", userId, set, rep, dur, weight, rpe, workoutId, tags) {
  return fetch(`https://fitness-api-wlzk.onrender.com/exercise/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "name": name,
      "description": description,
      "video_url": url,
      "user_id": userId,
      "set": set,
      "repetition": rep,
      "duration": dur,
      "weight": weight,
      "rpe": rpe,
      "workout_id": workoutId,
      "tags": tags
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function setExercise(id, exerciseData) {
  return fetch(`https://fitness-api-wlzk.onrender.com/exercise/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exerciseData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function getExercise(id) {
  return fetch(`https://fitness-api-wlzk.onrender.com/exercise/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

async function deleteExercise(id){
  return fetch(`https://fitness-api-wlzk.onrender.com/exercise/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }})
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data)=>{
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function getExerciseRating(id) {
  return fetch(`https://fitness-api-wlzk.onrender.com/exercise/${id}/rating`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

async function updateExercise(id, exerciseData) {
  try {
    const data = await getExercise(id);
    const updatedExerciseData = {
      name: exerciseData.name || data.name,
      description: exerciseData.description || data.description,
      video_url: exerciseData.video_url || data.video_url,
      user_id: exerciseData.user_id || data.user_id,
      set: exerciseData.set || data.set,
      repetition: exerciseData.repetition || data.repetition,
      duration: exerciseData.duration || data.duration,
      weight: exerciseData.weight || data.weight,
      rpe: exerciseData.rpe || data.rpe,
      workout_id: exerciseData.workout_id || data.workout_id,
      tags: exerciseData.tags || data.tags,
    };

    const result = await setExercise(id, updatedExerciseData);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

const cloneExercise = async (exerciseId, workoutId, userId) => {
  try {
    let exercise = await getExercise(exerciseId);
    createExercise(exercise.name, exercise.description, exercise.video_url, userId, exercise.set, exercise.repetition, exercise.duration, exercise.weight, exercise.rpe, workoutId, exercise.tags);
  } catch (error) {
    console.log("Error:", error)
  }
}

/**
 * Creates a new friendship between two users.
 * @async
 * @function
 * @param {string} userId - User ID initiating the friendship.
 * @param {string} friendId - User ID of the friend.
 * @param {string} statusId - Friendship status ID.
 * @throws {Error} Throws an error if the API request fails.
 * @returns {Promise<Object>} Returns a promise that resolves to friendship data.
 */
async function createFriendship(userId, friendId, statusId) {
  try {
    const response = await fetch('https://fitness-api-wlzk.onrender.com/friendship/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user_id": userId,
        "friend_id": friendId,
        "status_id": statusId,
      }),
    });
    if (response.status === 200) {
      console.log('Friend added');
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

/**
 * Retrieves all friendships for a given user.
 * @async
 * @function
 * @param {string} userId - User ID for which to retrieve friendships.
 * @throws {Error} Throws an error if the API request fails.
 * @returns {Promise<Object>} Returns a promise that resolves to an array of friendship data.
 */
async function getUserFriendships(userId) {
  const response = await fetch(`https://fitness-api-wlzk.onrender.com/friendships/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
}

async function getFriendship(friendshipId) {
  const response = await fetch(`https://fitness-api-wlzk.onrender.com/friendship/${friendshipId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
}

async function deleteFriendship(friendshipId) {
  const response = await fetch(`https://fitness-api-wlzk.onrender.com/friendship/${friendshipId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 200) {
    console.log('Friendship deleted');
    const data = await response.json();
    return data;
  }
}

/**
 * Updates the status of a friendship.
 * @async
 * @function
 * @param {string} friendshipId - Friendship ID.
 * @param {string} statusId - New friendship status ID.
 * @throws {Error} Throws an error if the API request fails.
 * @returns {Promise<Object>} Returns a promise that resolves when the update is successful.
 */
async function updateFriendship(friendshipId, statusId) {
  const response = await fetch(`https://fitness-api-wlzk.onrender.com/friendship/${friendshipId}/?status_id=${statusId}`, {
    method: 'PUT'
  });

  if (response.status === 200) {
    console.log('Friendship updated');
    const data = await response.json();
    return data;
  }
}

/**
 * Creates a new workout date.
 * @async
 * @function
 * @param {string} workoutID - ID of the associated workout.
 * @param {string} date - Date of the workout.
 * @throws {Error} Throws an error if the API request fails.
 * @returns {Promise<Object>} Returns a promise that resolves to the created workout date data.
 */
async function createWorkoutDate(workoutID, date, completed=false) {
  return fetch('https://fitness-api-wlzk.onrender.com/workout/date/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "date": date,
      "workout_id": workoutID,
      "completed": completed,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/**
 * Deletes a workout date.
 * @async
 * @function
 * @param {string} dateID - ID of the workout date to be deleted.
 * @throws {Error} Throws an error if the API request fails.
 * @returns {Promise<Object>} Returns a promise that resolves when the deletion is successful.
 */
async function deleteWorkoutDate(dateID) {
  return fetch(`https://fitness-api-wlzk.onrender.com/workout/date/${dateID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export { deleteExercise, createUser, getUserToken, getUser, getUserFromUserId, getUserIdFromFriendcode, createWorkout, updateWorkout, getWorkout, createExercise, updateExercise, getExercise, getExerciseRating, createFriendship, getFriendship, getUserFriendships, deleteFriendship, updateFriendship, setUserLanguage, updateUserProfilePicUrl, updateUserData, createWorkoutDate, deleteWorkoutDate, cloneExercise, getLanguage };

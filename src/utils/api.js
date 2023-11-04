// api.js

async function createUser(name, email, password, weight, height, gender) {
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

async function setUserLanguage(id, lang) {
  try {
    const data = await getUser(id);
    const updatedUserData = {
      name: data?.name,
      email: data?.email,
      height: data?.height,
      weight: data?.weight,
      gender: data?.gender,
      extra_data: {"lang": lang},
    };
    const result = await setWorkout(id, updatedUserData);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getLanguage() {
  const response = localStorage.getItem('token') !== null ? await getUser(localStorage.getItem('token')) : undefined;
  const lang = await response?.extra_data.lang;
  console.log(lang);
  return response;
}


function createWorkout(name="NAME", date=null, userId) {
  return fetch('https://fitness-api-wlzk.onrender.com/workout/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "name": name,
      "date": date,
      "user_id": userId
    }),
  })
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
    }).then((data)=>{
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
    }).then((data)=>{
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
      date: workoutData.date !== undefined ? workoutData.date : data.date,
      user_id: workoutData.user_id !== undefined ? workoutData.user_id : data.user_id
    };
    const result = await setWorkout(id, updatedWorkoutData);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

function createExercise(name="NAME", description="DESCRIPTION", url="URL", userId, set, rep, dur, weight, rpe, workoutId, tags) {
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
    }).then((data)=>{
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
    }).then((data)=>{
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
    }).then((data)=>{
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

async function createFriendship(userId, friendId, statusId) {
  try{
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

function testi(name="NAME", date=null, userId) {
  return fetch('https://fitness-api-wlzk.onrender.com/workout/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "name": name,
      "date": date,
      "user_id": userId
    }),
  })
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

export {createUser, getUserToken, getUser, getUserFromUserId, getUserIdFromFriendcode, createWorkout, updateWorkout, getWorkout, createExercise, updateExercise, getExercise, getExerciseRating, createFriendship, getFriendship, getUserFriendships, deleteFriendship, updateFriendship, testi, setUserLanguage};

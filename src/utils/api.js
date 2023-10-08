// api.js

export async function createUser(name, email, password, weight, height, gender) {
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
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch('https://fitness-api-wlzk.onrender.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${email}&password=${password}`,
    });
    if (response.ok) {
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

export async function getUser(token) {
  try {
    const response = await fetch('https://fitness-api-wlzk.onrender.com/user/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

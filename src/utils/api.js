const fetchUserData = async (userId) => {
    const response = await fetch(`https://api.github.com/users/${userId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }
    return await response.json();
}

const logUserIn = async (email, password) => {
    const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
    });
    const body = await response.json();
    if (response.ok) {
        return body;
    }
    throw new Error(body.error);
}

const authenticateUser = async (email, token) => {
    const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            token,
        }),
    });
    const body = await response.json();
    if (response.ok) {
        return body;
    }
    throw new Error(body.error);
}


export default {
    fetchUserData,
    logUserIn,
    authenticateUser,
};

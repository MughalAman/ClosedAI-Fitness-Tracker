const createUser = async (name, email, password, weight, height, gender) => {
        await fetch('https://fitness-api-wlzk.onrender.com/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            //tänne userin tietoja
            "name": name,
            "email": email,
            "password": password,
            "height": height,
            "weight": weight,
            "gender": gender
          }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          return data;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
}

const loginUser = async (email, password) => {
            fetch('https://fitness-api-wlzk.onrender.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          //tänne username salasana(jos on)
          body: `username=${email}&password=${password}`,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data?.access_token);
            return data?.access_token;
          })
          .catch((error) => {
            console.error('Error:', error);
          });
}

const getUser = async (token) => {
    fetch('https://fitness-api-wlzk.onrender.com/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          return data;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
}


export default {
    createUser,
    loginUser,
    getUser
};

import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const register = newUser => {
  return axios
    .post('http://localhost:3000/users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      membership_type: newUser.membership_type,
      isAdmin: false
    })
    .then(response => {
      console.log(response)
        return response.data;
    })
      .catch(err => {
          console.log(err)
      })
}

export const login = user => {
  return axios
    .post('http://localhost:3000/users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      const userToken = jwt_decode(response.data);
      localStorage.setItem('first_name',userToken.first_name);
      localStorage.setItem('last_name',userToken.last_name)
      localStorage.setItem('email',userToken.email)
      localStorage.setItem('membership_type',userToken.membership_type)
      localStorage.setItem('isAdmin',userToken.isAdmin)
      return response.data
    })
    .catch(err => {
      return err;
    })
}

export const getProfile = user => {
  return axios
    .get('http://localhost:3000/users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}


import axios from 'axios'
const BASEURL = 'http://localhost:3100'
// const BASEURL = 'https://calm-retreat-73218.herokuapp.com/'

const instance = axios.create({
  baseURL: BASEURL
})

export default instance

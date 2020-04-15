import io from 'socket.io-client'

const BASEURL = 'http://localhost:3100'
// const BASEURL = 'https://calm-retreat-73218.herokuapp.com/'

export default io(BASEURL)

import io from 'socket.io-client'

const BASEURL = 'http://localhost:3100'
// const BASEURL = 'https://ecommerce-server-2.herokuapp.com'

export default io(BASEURL)

import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/api'
// import socket from '../config/socket'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    users: [],
    user: '',
    token: '',
    isLogin: false,
    isLoading: false
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_USERS (state, payload) {
      state.users = payload
    },
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    },
    SET_TOKEN (state, payload) {
      state.token = payload
    }
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  actions: {

    login (context, payload) {
      console.log('LOGIN @ STORE')
      console.log(payload)
      return axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },

    fetchProducts (context, payload) {
      console.log('FETCH ITEMS @ STORE')
      return axios({
        method: 'get',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
      // .then(response => {
      //   console.log('SUCCESS FETCHING PRODUCTS')
      //   console.log(response.data.data)
      //   context.commit('SET_PRODUCTS', response.data.data)
      // // socket.emit('getProducts', response.data.data)
      // // socket.on('getProducts2', (payload) => {
      // //   this.$store.commit('SET_PRODUCTS', payload)
      // //   this.$toasted.success('FETCHED ALL PRODUCTS')
      // // })
      // })
      // .catch(err => {
      //   console.log(err.response)
      //   const arr = err.response.data.errors
      //   const code = err.response.status
      //   const type = err.response.statusText
      //   const ct = code + ' ' + type
      //   arr.forEach(el => {
      //     this.$toasted.error(`${ct}: ${el}`)
      //   })
      // })
    },

    getOneItem (context, payload) {
      console.log('FETCH ONE ITEM @ STORE')
      axios({
        method: 'get',
        url: '/products/' + payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log('SUCCESS FETCHING ONE PRODUCT')
          console.log(response.data)
          context.commit('SET_PRODUCT', response.data)
        })
        .catch(err => {
          console.log(err.response)
          const arr = err.response.data.errors
          const code = err.response.status
          const type = err.response.statusText
          const ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
        })
    },

    addItem (context, payload) {
      console.log('ADD ITEM @ STORE')
      console.log(payload)
      return axios({
        method: 'POST',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: payload.name,
          description: payload.description,
          category: payload.category,
          stock: Number(payload.stock),
          price: Number(payload.price)
        }
      })
    },

    showItemEditForm (context, payload) {
      console.log('FETCH EDIT FORM @ STORE')
      context.dispatch('getOneItem', payload)
    },

    editItem (context, payload) {
      console.log('EDIT ITEM @ STORE')
      return axios({
        method: 'put',
        url: '/products/' + payload.id,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: payload.name,
          description: payload.description,
          category: payload.category,
          image_url: payload.image_url,
          price: Number(payload.price),
          stock: Number(payload.stock)
        }
      })
    },

    deleteItem (context, payload) {
      console.log('DELETE ITEM @ STORE')
      console.log(payload)
      return axios({
        method: 'DELETE',
        url: '/products/' + payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
    }

  },
  modules: {
  }
})

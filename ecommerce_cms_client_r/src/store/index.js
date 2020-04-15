import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    productInfo: {
      id: null,
      name: '',
      category: '',
      image_url: '',
      price: null,
      stock: null
    },
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
    SET_PRODUCTINFO (state, payload) {
      state.productInfo.id = payload.id
      state.productInfo.name = payload.name
      state.productInfo.category = payload.category
      state.productInfo.image_url = payload.image_url
      state.productInfo.price = payload.price
      state.productInfo.stock = payload.stock
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
    },

    getOneItem (context, payload) {
      console.log('FETCH ONE ITEM @ STORE')
      return axios({
        method: 'get',
        url: '/products/' + payload,
        headers: {
          access_token: localStorage.access_token
        }
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
          stock: payload.stock,
          price: payload.price
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

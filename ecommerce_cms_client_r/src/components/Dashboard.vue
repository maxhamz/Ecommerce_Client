<template>
  <div class="dashboard" v-if="!isLoading">
    <Card
        v-for="product in products"
        :key="product.id"
        :item="product"
        class="cards"/>
  </div>
</template>

<script>
import Card from './Card'
import socket from '../config/socket'
export default {
  name: 'Dashboard',
  components: {
    // Navbar
    Card
  },
  props: [],
  data () {
    return {}
  },
  methods: {},
  computed: {
    products () {
      return this.$store.state.products
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
      .then(response => {
        console.log('SUCCESS FETCHING PRODUCTS')
        console.log(response)
        this.$store.commit('SET_PRODUCTS', response.data.data)
        socket.emit('getProducts', response.data.data)
        socket.on('getProducts2', (payload) => {
          this.$store.commit('SET_PRODUCTS', payload)
          this.$toasted.success('FETCHED ALL PRODUCTS')
        })
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
      .finally(_ => {
        this.$store.commit('SET_LOADING', false)
      })
  }
}
</script>

<style scoped>
    .cards {
        width: 50%;
        align-content: center;
        justify-items: center;
        align-items: center;
        margin-left: 25%;
        padding: 2vh;
    }
</style>

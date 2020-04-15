<template>
  <div class="btn-bar">
    <div class="mt-3">
      <b-button-group>
        <b-button variant="primary" router-link to="/home">Home</b-button>
        <b-button variant="success" router-link to="/dashboard">Show Items</b-button>
        <b-button variant="info" router-link to="/addItemForm">Add Item</b-button>
        <b-button variant="danger" @click.prevent="logout">Logout</b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
import socket from '../config/socket'
export default {
  name: 'Navbar',
  components: {},
  props: [],
  created () {},
  data () {
    return {
      user: ''
    }
  },
  methods: {
    logout () {
      console.log('LOGOUT @ hOME')
      this.user = this.$store.getters.getUser
      localStorage.clear()
      socket.emit('loggedout', this.user)
      this.$store.commit('SET_USER', '')
      socket.on('loggedout2', payload => {
        console.log(`${payload} HAS LOGGED OUT`)
        this.$toasted.show(`${payload} LOGGED OUT`)
      })
      this.$router.push({ path: '/' })
      this.$toasted.show('UNTIL NEXT TIME!')
    },

    showItems () {
      console.log('test show items')
    }
  }
}
</script>

<style>
</style>

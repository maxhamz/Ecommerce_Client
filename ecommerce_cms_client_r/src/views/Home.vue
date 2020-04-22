<template>
  <div class="pg-home">
    <Navbar />
    <h1>ADMIN PORTAL</h1>
    <p>Navigate the buttons to view, add, edit or edit the drugs in inventory.</p>
    <router-view />
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import socket from '../config/socket'
export default {
  name: 'Home',
  components: {
    Navbar
  },
  props: [],
  data () {
    return {}
  },
  methods: {},
  created () {
    // // NOTIFY ALL ADMIN UPON NEW PRODUCT CREATION
    // socket.on('added_product', payload => {
    //   this.$toasted.success(payload.name + ' ADDED TO INVENTORY', {
    //     position: 'bottom-center'
    //   })
    //   this.$store.dispatch('fetchProducts')
    //   console.log(payload.name + ' ADDED TO INVENTORY')
    // })

    // socket.on('updated_product', payload => {
    //   this.$toasted.success(payload.name + ' HAS BEEN UPDATED', {
    //     position: 'bottom-center'
    //   })
    //   this.$store.dispatch('fetchProducts')
    //   console.log(payload.name + ' EDITED')
    // })

    // socket.on('deleted_product', payload => {
    //   this.$toasted.show(payload)
    //   this.$store.dispatch('fetchProducts')
    // })

    // NOTIFY ADMIN IF USER CHECKSOUT THINGS
    socket.on('usercheckedout', payload => {
      this.$toasted.success(payload)
    })
  }
  // computed () {
  //   socket.on('added_product', payload => {
  //     this.$toasted.success(payload.name + ' ADDED TO INVENTORY', {
  //       position: 'bottom-center'
  //     })
  //     this.$store.dispatch('fetchProducts')
  //     console.log(payload.name + ' ADDED TO INVENTORY')
  //   })

  //   socket.on('updated_product', payload => {
  //     this.$toasted.success(payload.name + ' HAS BEEN UPDATED', {
  //       position: 'bottom-center'
  //     })
  //     this.$store.dispatch('fetchProducts')
  //     console.log(payload.name + ' EDITED')
  //   })
  // }
}
</script>

<style>
</style>

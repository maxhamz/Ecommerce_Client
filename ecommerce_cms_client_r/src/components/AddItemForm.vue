<template>
  <div id="pg-add-item">
    <!-- <Navbar /> -->
    <h3>Add New Item</h3>
    <form id="add-item-form">
      Name:
      <input type="text" required id="add-item-name" v-model="addParams.name" />
      <br />Description:
      <input type="text" required id="add-item-desc" v-model="addParams.description" />
      <br />Category:
      <select id="add-item-category" v-model="addParams.category">
        <option value="otc">OTC</option>
        <option value="otc_limited">Limited OTC</option>
        <option value="prescription">Prescription Only</option>
        <option value="herbal">Herbal, Supplements</option>
      </select>
      <br />Image URL:
      <input type="text" required id="add-item-image" v-model="addParams.image_url" />
      <br />Stock:
      <input type="text" required id="add-item-stock" v-model="addParams.stock" />
      <br />Price:
      <input type="text" required id="add-item-price" v-model="addParams.price" />
      <br />
      <b-button variant="primary" form="add-item-form" @click.prevent="addItem">Add Item</b-button>
    </form>
  </div>
</template>

<script>
// import Navbar from './Navbar'
import socket from '../config/socket'
export default {
  name: 'AddItemForm',
  components: {
    // Navbar
  },
  props: [],
  data () {
    return {
      product: {},
      addParams: {
        name: '',
        description: '',
        category: '',
        image_url: '',
        stock: 0,
        price: 0
      }
    }
  },
  methods: {
    addItem () {
      console.log('ADD ITEM @ FORMPAGE')
      console.log(this.addParams)
      this.$store
        .dispatch('addItem', this.addParams)
        .then(response => {
          console.log('PRODUCT ADDED')
          console.log(response.data)
          this.product = response.data
          socket.emit('new_product', response.data)
          this.$router.push({ path: '/dashboard' })
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
    }
  },
  created () {
    socket.on('added_product', (payload) => {
      this.$toasted.success(payload.name + ' ADDED TO INVENTORY', {
        position: 'bottom-center'
      })
      console.log(payload.name + ' ADDED TO INVENTORY')
    })
  }
}
</script>

<style scoped>
#add-item-form {
  padding: 2vh;
  margin: 2vh;
  justify-content: center;
  align-content: center;
  align-items: center;
}
</style>

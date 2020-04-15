<template>
  <div id="pg-edit-item">
    <!-- <Navbar /> -->
    <h3>Edit Drug Information</h3>
    <form id="edit-item-form">
      Name:
      <input type="text" required id="edit-item-name" v-model="details.name" />
      <br /><br />Description:
      <input type="text" required id="edit-item-desc" v-model="details.description" />
      <br /><br />Category:
      <select id="edit-item-category" v-model="details.category">
        <option value="otc">OTC</option>
        <option value="otc_limited">Limited OTC</option>
        <option value="prescription">Prescription Only</option>
        <option value="herbal">Herbal, Supplements</option>
      </select>
      <br /><br />Image URL:
      <input type="text" required id="edit-item-image" v-model="details.image_url" />
      <br /><br />Stock:
      <input type="text" required id="edit-item-stock" v-model="details.stock" />
      <br /><br />Price:
      <input type="text" required id="edit-item-price" v-model="details.price" />
      <br /><br />
      <b-button variant="primary" form="edit-item-form" @click.prevent="editItem">Edit Info</b-button>
    </form>
  </div>
</template>

<script>
// import Navbar from './Navbar'
import socket from '../config/socket'
export default {
  name: 'EditItemForm',
  components: {
    // Navbar
  },
  props: [],
  data () {
    return {
    }
  },
  methods: {
    editItem () {
      console.log('EDIT ITEM @ STORE')
      console.log(this.details)
      this.$store.dispatch('editItem', this.details)
        .then(response => {
          console.log('PRODUCT EDITED')
          console.log(response.data)
          this.product = response.data
          socket.emit('product_update', response.data)
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
  computed: {
    details () {
      console.log('MAKING SURE EDIT PARAMS')
      console.log(this.$store.state.product)
      return this.$store.state.product
    }
  },
  created () {
    const id = this.$route.params.id
    console.log('HELLO DRUG #?')
    console.log(id)
    this.$store.dispatch('showItemEditForm', id)
    socket.on('updated_product', (payload) => {
      this.$toasted.success(payload.name + ' HAS BEEDN EDITED', {
        position: 'bottom-center'
      })
      this.$store.dispatch('fetchProducts')
      console.log(payload.name + ' EDITED')
    })
  }
}
</script>

<style scoped>
#edit-item-form {
  padding: 2vh;
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 25%;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid black;
  width: 50%;
}
</style>

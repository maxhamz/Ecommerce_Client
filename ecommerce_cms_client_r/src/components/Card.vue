<template>
  <div class="card">
    <b-card
      :img-src="`${item.image_url}`"
      :img-alt="`${item.name}`"
      img-left
      img-height="100vh"
      img-width="100vh"
      class="mb-3"
    >
      <b-card-text>
        <p>
          <router-link :to="{ name: 'Detail', params: { id: item.id } }">
            <b>
              <h5>{{ item.name }}</h5>
            </b>
          </router-link>
        </p>
        <p>IDR {{ item.price }}</p>
        <p>QTY: {{ item.stock }} pcs</p>
        <p>
          <b-button-group>
            <b-button variant="info" @click.prevent="showEditItemForm(item.id)">Update</b-button>
            <b-button variant="danger" @click.prevent="dropItem(item.id, item.name)">Delete</b-button>
          </b-button-group>
        </p>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import socket from '../config/socket'
export default {
  name: 'Card',
  components: {
    // Navbar
  },
  props: ['item'],
  data () {
    return {}
  },
  methods: {
    showEditItemForm (productId) {
      console.log('SHOW EDIT PRODUCT FORM @ CARD')
      console.log(productId)
      // this.$store.dispatch('showItemEditForm', productId)
      this.$router.push({ name: 'EditItemForm', params: { id: productId } })
    },

    dropItem (productId, productName) {
      console.log('DELETE ITEM @ CARD')
      console.log(productId)
      this.$store
        .dispatch('deleteItem', productId)
        .then(response => {
          console.log('DELETE PRODUCT SUCCESS')
          console.log(response.data.message)
          socket.emit('product_deleted', response.data.message)
          socket.on('deleted_product', payload => {
            this.$toasted.show(payload)
            this.$store.dispatch('fetchProducts')
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
  },
  created () {
    // socket.on('deleted_product', payload => {
    //   this.$toasted.success(payload)
    //   this.$store.dispatch('fetchProducts')
    // })
  }
}
</script>

<style scoped>
.card {
  width: 100%;
  border: 0.5px solid black;
  background-color: brown;
  padding: 2vh;
  margin: 2vh;
}

.mb-3 {
  background-color: wheat;
  padding: 2vh;
  margin: 2vh;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
}
</style>

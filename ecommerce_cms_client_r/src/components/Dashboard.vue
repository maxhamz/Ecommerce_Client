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

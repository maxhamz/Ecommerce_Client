<template>
  <div class="item-details" v-if="details.name && !isLoading">
      <h3>DRUG DETAILS</h3>
      <h5>TRADE NAME</h5>
      <p>{{details.name}}</p>
      <h5>ACTIVE INGREDIENTS</h5>
      <p>{{ details.description }}</p>
      <h5>DRUG CATEGORY</h5>
      <h4><b>{{details.category}}</b></h4>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: [],
  components: {},
  data () {
    return {
      product: {}
    }
  },
  methods: {},
  computed: {
    details () {
      console.log("WHAT'S PRODUCT DETAILS?")
      console.log(this.$store.state.product)
      return this.$store.state.product
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    const id = this.$route.params.id
    this.$store.dispatch('getOneItem', id)
  }
}
</script>

<style>

</style>

<template>
  <div class="item-details" v-if="details.name">
      <h3>DRUG DETAILS</h3>
      <p>TRADE NAME: {{details.name}}</p>
      <p>ACTIVE INGREDIENTS: {{ details.description }}</p>
      <p>DRUG CATEGORY: <b>{{details.category}}</b></p>
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
      return this.$store.state.product
    }
  },
  created () {
    const id = this.$route.params.id
    this.$store.dispatch('getOneItem', id)
      .then(response => {
        console.log('SUCCESS FETCHING ONE PRODUCT')
        console.log(response.data)
        this.$store.commit('SET_PRODUCT', response.data)
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
}
</script>

<style>

</style>

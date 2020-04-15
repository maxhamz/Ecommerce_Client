<template>
  <div class="pg-home">
    <Navbar/>
    <h1>ADMIN PORTAL</h1>
    <p>Navigate the buttons to view, add, edit or edit the drugs in inventory.</p>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  name: 'Home',
  components: {
    Navbar
  },
  props: [],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style>
</style>

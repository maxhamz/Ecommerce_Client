<template>
  <div class="pg-landing">

    <!-- FORM LOGIN START -->
    <LoginForm/>
    <!-- FORM LOGIN END -->

    <!-- JUMBOTRON START -->
    <div class="pg-jumbotron">
      <b-jumbotron header="e-Apotheke CMS Portal" lead="Welcome Back, Admin!">
        <p>Please Login to Continue</p>
      </b-jumbotron>
    </div>
    <!-- JUMBOTRON END -->
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '../components/LoginForm.vue'
export default {
  name: 'Landing',
  props: [],
  components: {
    LoginForm
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  }
}
</script>
<style scoped>
</style>

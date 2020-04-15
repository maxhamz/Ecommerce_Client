<template>
  <div class="pg-form-login">
    <b-form inline class="form-login">
      <label class="sr-only" for="inline-form-input-email">Email</label>
      <b-input
        id="inline-form-input-email"
        v-model="form.email"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="janedoe@mail.com"
      ></b-input>

      <label class="sr-only" for="inline-form-input-password">Password</label>
      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-input
          id="inline-form-input-password"
          v-model="form.password"
          type="password"
          placeholder="secret"
        ></b-input>
      </b-input-group>

      <b-button variant="primary" form="form-login" @click.prevent="login">LOGIN</b-button>
    </b-form>
  </div>
</template>

<script>
import socket from '../config/socket'
export default {
  name: 'LoginForm',
  props: [],
  components: {

  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {

    login () {
      console.log('LOGIN @ LANDINGPAGE.VUE')
      this.$store.dispatch('login', this.form)
        .then(response => {
          console.log('SUCCESS LOGIN')
          console.log(response.data.access_token)
          this.$store.commit('SET_LOGIN', true)
          this.$store.commit('SET_TOKEN', response.data.access_token)
          this.$store.commit('SET_USER', response.data.email)
          localStorage.setItem('access_token', response.data.access_token)
          // SOCKET
          socket.emit('loggedin', response)

          socket.on('loggedin2', response => {
            const wlcm = 'HELLO AGAIN, ' + response
            this.$toasted.success(wlcm)
            console.log(wlcm)
            // this.fetchProjects();
          })

          this.$router.push({ path: '/home' })
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
  }
}
</script>
<style scoped>
  .form-login {
    padding: 2vh;
    justify-content: center;
    align-content: center;
    align-items: center;
    background-color: #F51818;
  }
</style>

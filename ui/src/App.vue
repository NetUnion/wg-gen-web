<template>
  <v-app id="inspire">
    <Notification/>
    <div>
      <Header/>

      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>

      <Footer/>
    </div>
  </v-app>
</template>

<script>
  import Notification from './components/Notification'
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import {mapGetters} from "vuex";

  export default {
    name: 'App',

    components: {
      Footer,
      Header,
      Notification
    },

    computed:{
      ...mapGetters({
        isAuthenticated: 'auth/isAuthenticated',
        authStatus: 'auth/authStatus',
        authRedirectUrl: 'auth/authRedirectUrl',
      })
    },

    created () {
      this.$vuetify.theme.dark = true
    },

    watch: {
      isAuthenticated(newValue, oldValue) {
        console.log(`Updating isAuthenticated from ${oldValue} to ${newValue}`);
        if (newValue === true) {
          this.$router.push('/clients')
        }
        else{
          this.$router.push('/')
        }
      },

      authStatus(newValue, oldValue) {
        console.log(`Updating authStatus from ${oldValue} to ${newValue}`);
        if (newValue === 'redirect') {
          window.location.replace(this.authRedirectUrl)
        }
      },
    },
  };
</script>

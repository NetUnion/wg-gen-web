<template>
  <v-main>
    <v-container>
      <h1 class="text-center text-h1">
        <img :style="$vuetify.theme.dark?'':'filter: invert(100%);'" v-if="!siteicon" :src="require('../assets/logo.png')" height="256" alt="Wg Gen Web"/>
        <v-icon color="grey" size="256" v-else>{{ siteicon }}</v-icon>
      </h1>
      <div class="mt-3 mb-6">
        <template v-if="isAuthenticated">
          <h3 class="text-center text-h3 mb-4">
            Hello, {{ user.name }}!
          </h3>
          <h5 class="text-center text-h5 mb-4">
              Please select an option to continue.
          </h5>
        </template>
        <template v-else>
          <h3 class="text-center text-h3 mb-4">
            Welcome to {{ sitename }}!
          </h3>
          <template v-if="!redirecting">
            <h5 class="text-center text-h5 mb-4">
              Please login first.
            </h5>
          </template>
          <template v-else>
            <h5 class="text-center text-h5 mb-4">
              Redirecting...
            </h5>
            <div class="text-center mt-8">
              <v-progress-circular indeterminate color="primary" size="64" />
            </div>
          </template>
        </template>
      </div>
    </v-container>
  </v-main>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: 'home',

    data: ()=>({
      redirecting: false
    }),

    methods: {
      ...mapActions('auth', {
        oauth2_url: 'oauth2_url',
        oauth2_exchange: 'oauth2_exchange',
      }),
    },

    computed: {
      ...mapGetters({
        user: 'auth/user',
        authStatus: 'auth/authStatus',
        isAuthenticated: 'auth/isAuthenticated',
      }),
      sitename: () => process.env.VUE_APP_SITENAME || 'NUVPN Dashboard',
      siteicon: () => process.env.VUE_APP_SITEICON
    },

    watch: {
      authStatus(val) {
        if(val !== 'success')
          this.redirecting = false
      }
    },

    mounted() {
      if (this.$route.query.code && this.$route.query.state) {
        this.redirecting = true
        this.oauth2_exchange({
          code: this.$route.query.code,
          state: this.$route.query.state
        })
      }
    }
  };
</script>

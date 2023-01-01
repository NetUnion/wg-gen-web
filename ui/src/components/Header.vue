<template>
    <v-container>
        <v-app-bar app class="overflow-x-auto">
            <img v-if="!siteicon" :src="require('../assets/logo.png')" height="50" alt="Wg Gen Web"/>
            <v-toolbar-title to="/" @click="$router.push('/')">
                <v-icon large v-if="siteicon" left>{{ siteicon }}</v-icon>
                {{ sitename }}
            </v-toolbar-title>

            <v-spacer />

            <v-toolbar-items>
                <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
                    <v-icon dark>mdi-theme-light-dark</v-icon>
                </v-btn>
                <v-btn to="/clients" v-if="isAuthenticated">
                    Clients
                    <v-icon right dark>mdi-account-network-outline</v-icon>
                </v-btn>
                <v-btn to="/server" v-if="isAuthenticated">
                    Server
                    <v-icon right dark>mdi-vpn</v-icon>
                </v-btn>
                <v-btn to="/status" v-if="isAuthenticated">
                    Status
                    <v-icon right dark>mdi-chart-bar</v-icon>
                </v-btn>
                <v-btn color="primary" @click="oauth2_url" v-if="!isAuthenticated">
                    Login
                    <v-icon right dark>mdi-login</v-icon>
                </v-btn>
            </v-toolbar-items>

            <v-menu
                    left
                    bottom
                    v-if="isAuthenticated"
            >
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-account-circle</v-icon>
                    </v-btn>
                </template>

                <v-card
                        class="mx-auto"
                        max-width="344"
                        outlined
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline mb-4">connected as</div>
                            <v-list-item-title class="headline mb-1">{{user.name}}</v-list-item-title>
                            <v-list-item-subtitle>Email: {{user.email}}</v-list-item-subtitle>
                            <v-list-item-subtitle>Issuer: {{user.issuer}}</v-list-item-subtitle>
                            <v-list-item-subtitle>Issued at: {{ user.issuedAt | formatDate }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions>
                        <v-btn small
                                v-on:click="logout()"
                        >
                            logout
                            <v-icon small right dark>mdi-logout</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>

        </v-app-bar>
    </v-container>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: 'Header',

    computed:{
      ...mapGetters({
        user: 'auth/user',
        isAuthenticated: 'auth/isAuthenticated',
      }),
      sitename: () => process.env.VUE_APP_SITENAME || 'Wg Gen Web',
      siteicon: () => process.env.VUE_APP_SITEICON
    },

    methods: {
      ...mapActions('auth', {
        logout: 'logout',
        oauth2_url: 'oauth2_url',
      }),
    }
  }
</script>

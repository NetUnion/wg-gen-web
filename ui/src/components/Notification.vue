<template>
    <v-snackbar
            v-model="notification.show"
            :right="true"
            :top="true"
            :color="notification.color"
    >
        {{ notification.text }}
        <v-btn
                dark
                text
                @click="notification.show = false"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>
<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'Notification',
    data: () => ({
      notification: {
        show: false,
        color: '',
        text: '',
      },
    }),

    computed:{
      ...mapGetters({
        authError: 'auth/error',
        clientError: 'client/error',
        serverError: 'server/error',
      })
    },

    methods: {
      notify(color, msg) {
        this.notification.show = true;
        this.notification.color = color;
        this.notification.text = msg;
      }
    },

    watch: {
      authError(newValue, oldValue) {
        console.log(newValue)
        this.notify('error', newValue);
      },

      clientError(newValue, oldValue) {
        console.log(newValue)
        this.notify('error', newValue);
      },

      serverError(newValue, oldValue) {
        console.log(newValue)
        this.notify('error', newValue);
      },
    }
  };
</script>

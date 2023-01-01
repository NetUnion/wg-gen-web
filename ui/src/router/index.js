import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: '/clients',
    name: 'Clients',
    component: function () {
      return import(/* webpackChunkName: "Clients" */ '../views/Clients.vue')
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/server',
    name: 'Server',
    component: function () {
      return import(/* webpackChunkName: "Server" */ '../views/Server.vue')
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/status',
    name: 'Status',
    component: function () {
      return import(/* webpackChunkName: "Status" */ '../views/Status.vue')
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: function () {
      return import(/* webpackChunkName: "Home" */ '../views/Home.vue')
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/isAuthenticated"]) {
      next()
      return
    }
    next('/')
    //store.dispatch("auth/oauth2_url")
  } else {
    next()
  }
})

export default router

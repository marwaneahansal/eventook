import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../layouts/Main.vue'),
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home'),
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
      {
        path: '/events',
        name: 'Events',
        // route level code-splitting
        // this generates a separate chunk (event.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "event" */ '../views/Events.vue'),
      },
      {
        path: '/events/:id',
        name: 'EventDetails',
        // route level code-splitting
        // this generates a separate chunk (event.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "event-details" */ '../views/EventDetails.vue'),
      },
      {
        path: '/events/:id/tickets',
        name: 'EventTickets',
        // route level code-splitting
        // this generates a separate chunk (event.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "event-tickets" */ '../views/EventTickets.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (event.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        // route level code-splitting
        // this generates a separate chunk (event.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/events',
    // route level code-splitting
    // this generates a separate chunk (event.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "full-page" */ '../layouts/FullPage.vue'),
    children: [
      {
        path: '/dashboard/events',
        name: 'DashboardEvents',
        // route level code-splitting
        // this generates a separate chunk (event.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return { x: savedPosition.x, y: savedPosition.y };
    return { x: 0, y: 0 };
  },
});

export default router;

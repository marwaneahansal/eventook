import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
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
];

const router = new VueRouter({
  routes,
  scrollBehavior(_to, _from, _savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;

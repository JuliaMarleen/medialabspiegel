import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/takepic',
    name: 'TakePic',
    component: () => import(/* webpackChunkName: "about" */ '../views/TakePic.vue'),
  },
];

const router = new VueRouter({
  mode: '',
  base: process.env.BASE_URL,
  routes,
});

export default router;

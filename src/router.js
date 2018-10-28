import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/note/:noteId',
      name: 'lectureNote',
      component: () => import('./views/LectureNote.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/upload',
      name: 'uploadLecture',
      component: () => import('./views/UploadLecture.vue'),
      meta: { isLoggedIn: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/SignUp.vue'),
    },
    {
      path: '/parse-samples',
      name: 'parseSamples',
      component: () => import('./views/ParseSamples.vue'),
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: () => import('./views/Favourite.vue'),
      meta: { isLoggedIn: true },
    },
    {
      path: '/manage-reports',
      name: 'reportList',
      component: () => import('./views/ReportList.vue'),
      meta: { isModerator: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isLoggedIn)) {
    if (!store.state.loggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else { next(); }
  } else if (to.matched.some(record => record.meta.isModerator)) {
    if (!store.state.roles.mod) next({ path: '/forbidden/' });
    else next();
  } else {
    next();
  }
});

export default router;

import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
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
    },
    {
      path: '/manage-reports',
      name: 'reportList',
      component: () => import('./views/ReportList.vue'),
    },
  ],
});

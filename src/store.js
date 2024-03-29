/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Puex from 'puex';

Vue.use(Puex);

const store = new Puex({
  state: {
    loggedIn: false,
    username: undefined,
    roles: {
      mod: false,
    },
    parseCred: {
      note: 'These are public keys. No need to be excited.',
      appId: 'A7gOtAmlXetuUbCejDVjEPiyMJpR4ET9TSjDHiqP',
      jsKey: 'UaRg8CWpNhY9WbkDk93Ki6LQZ7ssnQfVRMXYyRJr',
      serverUrl: 'https://parseapi.back4app.com/',
    },
    endpoints: {
      objectStorage: 'https://pony.sgp1.digitaloceanspaces.com',
      uploadHandler: 'https://pony.zartre.com',
    },
    levelList: {
      ZrcmFMujIq: { value: 'มัธยมต้น', key: 'ZrcmFMujIq' },
      kLw7feA5YP: { value: 'มัธยมปลาย', key: 'kLw7feA5YP' },
      V6k5aayDKl: { value: 'ปริญญาตรี', key: 'V6k5aayDKl' },
    },
    categoryList: [],
    topSearchInput: '',
  },
  mutations: {
    loggedIn(state, logged) {
      state.loggedIn = logged;
    },
    updateCategoryList(state, data) {
      state.categoryList = data;
    },
    updateTopSearchInput(state, data) {
      state.topSearchInput = data;
    },
    updateRoleMod(state, data) {
      state.roles.mod = data;
    },
    updateUsername(state, data) {
      state.username = data;
    },
  },
});

export default store;

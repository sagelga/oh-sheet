/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Puex from 'puex';

Vue.use(Puex);

const store = new Puex({
  state: {
    loggedIn: false,
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
  },
  mutations: {
    loggedIn(state, logged) {
      state.loggedIn = logged;
    },
  },
});

export default store;

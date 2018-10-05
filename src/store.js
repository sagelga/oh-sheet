import Vue from 'vue';
import Puex from 'puex';

Vue.use(Puex);

const store = new Puex({
  state: {
    loggedIn: false,
    parseCred: {
      appId: 'A7gOtAmlXetuUbCejDVjEPiyMJpR4ET9TSjDHiqP',
      jsKey: 'UaRg8CWpNhY9WbkDk93Ki6LQZ7ssnQfVRMXYyRJr',
      serverUrl: 'https://parseapi.back4app.com/',
    },
  },
});

export default store;

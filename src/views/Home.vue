<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>HOME PAGE</h1>
    <router-link to="/note/123">Lecture View</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>

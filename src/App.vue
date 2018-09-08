<template>
  <div id="app">
    <TopNav></TopNav>
    <router-view/>
  </div>
</template>

<style lang="scss">
.top-gap {
  margin-top: 5em;
}
.row-wrap {
  margin-left: 10px;
  margin-right: 10px;
}
</style>

<script>
import TopNav from '@/components/TopNav.vue';

export default {
  components: {
    TopNav,
  },
};
</script>

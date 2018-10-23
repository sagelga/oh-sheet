<template>
  <div class="user-chip">
    <router-link :to="'/profile/' + user.username">
      <img src="/img/avatar.png" :alt="user.username">
      {{ user.username }}
    </router-link>
  </div>
</template>

<style lang="sass">
.user-chip
  margin-top: 0.2em
  margin-bottom: 0.2em
  img
    width: 25px
    vertical-align: middle
    margin-right: 0.2em
  span
    line-height: 1em
</style>

<script>
export default {
  name: 'UserChip',
  props: {
    user: Object,
  },
};
</script>

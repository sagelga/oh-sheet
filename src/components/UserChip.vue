<template>
  <div class="user-chip">
    <router-link :to="'/profile/' + user.username + '/'">
      <img :src="avatarPath" :alt="user.username">
      {{ user.username }}
    </router-link>
    <!-- TODO: Display badges here -->
  </div>
</template>

<style lang="sass">
.user-chip
  margin-top: 0.2em
  margin-bottom: 0.2em
  img
    width: 25px
    height: 25px
    vertical-align: middle
    margin-right: 0.2em
    border-radius: 50%
  span
    line-height: 1em
</style>

<script>
export default {
  name: 'UserChip',
  props: {
    user: Object,
  },
  computed: {
    avatarPath() {
      if (this.user.avatarPath) {
        return `${this.$store.state.endpoints.objectStorage}/${this.user.avatarPath}`;
      }
      return '/img/avatar.png';
    },
  },
};
</script>

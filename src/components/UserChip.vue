<template>
  <div class="user-chip">
    <img :src="avatar" :alt="displayName">
    {{ displayName }}
  </div>
</template>

<style lang="scss">
  .user-chip {
    margin-top: 0.2em;
    margin-bottom: 0.2em;

    img {
      width: 25px;
      vertical-align: middle;
      margin-right: 0.2em;
    }

    span {
      line-height: 1em;
    }
  }
</style>

<script>
export default {
  name: 'UserChip',
  props: {
    avatar: String,
    displayName: String,
  },
  data() {
    return {
      undefined,
    };
  },
};
</script>

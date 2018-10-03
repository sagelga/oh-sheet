<template>
  <div class="quality-thumbs">

    <el-button type="text" style="margin-right: 0.5em">
      <span class="material-icons">thumb_up</span>
      {{ voteUp }}
    </el-button>

    <el-button type="text">
      <span class="material-icons" style="margin-right: 0.15em">thumb_down</span>
      {{ voteDown }}
    </el-button>

  </div>
</template>

<style lang="scss">
  .quality-thumbs {
    .material-icons {
      font-size: 1.6em;
    }
  }
</style>

<script>
export default {
  name: 'QualityThumbs',
  props: {
    voteUp: Number,
    voteDown: Number,
  },
};
</script>

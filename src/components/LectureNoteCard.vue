<template>
  <router-link :to="'/note/' + lectureNote.objectId + '/'">
    <el-card :body-style="{padding: '0px'}" shadow="hover">
      <img :src="thumbnailUrl" :alt="lectureNote.title">
      <div style="padding: 1em;">
        <h1>{{ lectureNote.title }}</h1>
        <span class="meta">{{ categories }}</span>
        <UserChip :user="author" />
      </div>
    </el-card>
  </router-link>
</template>

<script>
import UserChip from '@/components/UserChip.vue';
import store from '@/store';

export default {
  name: 'LectureNoteCard',
  components: { UserChip },
  props: {
    author: Object,
    lectureNote: Object,
  },
  computed: {
    categories() {
      if (this.lectureNote.categories.length > 0) {
        return this.lectureNote.categories[0].englishName;
      }
      return '';
    },
    thumbnailUrl() {
      return `${store.state.endpoints.objectStorage}/${this.lectureNote.thumbnailPath}`;
    },
  },
};
</script>

<style scoped lang="sass">
img
  display: block
  width: 100%
h1
  font-size: 1em
  margin: 0 0 0.3em
span.meta
  display: block
  margin-bottom: 0.5em
.el-card
  height: 100%
</style>

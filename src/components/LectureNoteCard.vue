<template>
  <router-link :to="'/note/' + lectureNote.objectId">
    <el-card :body-style="{padding: '0px'}" shadow="hover">
      <img src="https://via.placeholder.com/300x424" alt="Preview">
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

export default {
  name: 'LectureNoteCard',
  components: { UserChip },
  props: {
    author: Object,
    lectureNote: Object,
  },
  computed: {
    categories() {
      if (this.lectureNote.categories) return this.lectureNote.categories[0];
      return '';
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
</style>

<template>
  <BoxedContainer v-loading="loadingProfile" class="top-gap bottom-gap">
    <div class="profile-meta">
      <img :src="user.avatarPath || '/img/avatar.png'" :alt="user.username" class="avatar">
      <h1>{{ user.username }}</h1>
      <img :src="user.avatarPath || '/img/avatar.png'" style="display:inline-block; margin-right: 10px;" width="50" height="50">
      <img :src="user.avatarPath || '/img/avatar.png'" style="display:inline-block; margin-right: 10px;" width="50" height="50">
      <img :src="user.avatarPath || '/img/avatar.png'" style="display:inline-block; margin-right: 10px;" width="50" height="50">
      <img :src="user.avatarPath || '/img/avatar.png'" style="display:inline-block; margin-right: 10px;" width="50" height="50">
      <img :src="user.avatarPath || '/img/avatar.png'" style="display:inline-block; margin-right: 10px;" width="50" height="50">
    </div>
    <el-row :gutter="20" v-loading="loadingLectureNotes">
      <el-col :span="6" v-for="lecture in lectureNotes" :key="lecture.objectId">
        <LectureNoteCard :author="user" :lecture-note="lecture" />
      </el-col>
    </el-row>
  </BoxedContainer>
</template>

<style scoped lang="sass">
.profile-meta
  max-width: 300px
  margin: 0 auto 2em
  text-align: center
  img.avatar
    width: 128px
    height: 128px
</style>

<script>
import store from '@/store';
import BoxedContainer from '@/components/BoxedContainer.vue';
import LectureNoteCard from '@/components/LectureNoteCard.vue';

const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

export default {
  name: 'Profile',
  components: { LectureNoteCard, BoxedContainer },
  data() {
    return {
      user: {},
      userFields: ['avatarPath', 'username', 'createdAt'],
      lectureNotes: [],
      loadingProfile: true,
      loadingLectureNotes: true,
      foundProfile: false,
    };
  },
  methods: {
    async getUserProfile(username) {
      const query = new Parse.Query(Parse.User);
      query.equalTo('username', username);
      const user = await query.first();
      return user;
    },
    async getLecturesOfUserPointer(user) {
      const LectureNote = Parse.Object.extend('LectureNote');
      const query = new Parse.Query(LectureNote);
      query.equalTo('author', user);
      const lectureNotes = await query.find();
      return lectureNotes;
    },
    getLectureNoteAttrs(lecture, attrs) {
      const newLecture = {};
      attrs.forEach((a) => {
        newLecture[a] = lecture.get(a);
      });
      if (attrs.includes('objectId') || attrs.includes('id')) {
        newLecture.objectId = lecture.id;
      }
      return newLecture;
    },
  },
  created() {
    this.getUserProfile(this.$route.params.username)
      .then((user) => {
        this.userFields.forEach((f) => {
          this.user[f] = user.get(f);
        });
        this.user.objectId = user.id;
        this.loadingProfile = false;
        this.foundProfile = true;
        this.getLecturesOfUserPointer(user)
          .then((lectureNotes) => {
            lectureNotes.forEach((lec) => {
              const wantedAttrs = ['objectId', 'title', 'description', 'categories', 'thumbnailPath'];
              this.lectureNotes.push(this.getLectureNoteAttrs(lec, wantedAttrs));
            });
            this.loadingLectureNotes = false;
          });
      });
  },
};
</script>

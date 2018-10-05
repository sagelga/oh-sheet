<template>
  <BoxedContainer v-loading="loadingProfile" class="top-gap">
    <div class="profile-meta">
      <img :src="user.avatarPath || '/img/avatar.png'" :alt="user.username" class="avatar">
      <h1>{{ user.username }}</h1>
    </div>
    <el-row :gutter="20">
      <el-col :span="6"></el-col>
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

const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

export default {
  name: 'Profile',
  components: { BoxedContainer },
  data() {
    return {
      user: {},
      userFields: ['avatarPath', 'username', 'createdAt'],
      loadingProfile: true,
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
            console.log(lectureNotes);
          });
      });
  },
};
</script>

<template>
  <BoxedContainer class="top-gap bottom-gap">
    <div class="side-margin" v-loading="loading">
      <h1>รายการโน้ตที่ชื่นชอบ</h1>
      <div v-show="!loading && lectureNote.length === 0" style="text-align: center">
        <h3>ยังไม่ได้ติดดาวโน้ตเลคเชอร์ใดๆ</h3>
        <img src="/img/undraw_empty_xct9.svg" alt="empty" class="lecture-not-found">
      </div>
      <el-row :gutter="20">
        <el-col v-for="lecture in lectureNote"
                :key="lecture.objectId"
                :xs="24" :sm="8" :md="6">
          <LectureNoteCard :author="lecture.author" :lectureNote="lecture" />
        </el-col>
      </el-row>
    </div>
  </BoxedContainer>
</template>

<style></style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';
import LectureNoteCard from '@/components/LectureNoteCard.vue';
import store from '@/store';

const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

export default {
  name: 'Favourite',
  components: {
    BoxedContainer,
    LectureNoteCard,
  },
  data() {
    return {
      userId: Parse.User.current() ? Parse.User.current().id : null,
      favouriteList: [],
      lectureNote: [],
      loading: true,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  methods: {
    async getFavLectures() {
      const favLecture = Parse.Object.extend('User');
      const query = new Parse.Query(favLecture);
      query.equalTo('objectId', this.userId);
      const lectureNotes = await query.find();
      const lectureQuery = new Parse.Query(Parse.Object.extend('LectureNote'));

      lectureNotes[0].get('favedNotes')
        .forEach((element) => {
          lectureQuery.equalTo('objectId', element);
          lectureQuery.include('author');
          this.favouriteList.push(element);
        });
      lectureQuery.include('author');
      lectureQuery.containedIn('objectId', this.favouriteList);
      lectureQuery.find()
        .then((results) => {
          const lectureAttrs = ['objectId', 'title', 'categories', 'thumbnailPath', 'author'];
          const authorAttrs = ['objectId', 'username', 'avatarPath'];

          results.forEach((item) => {
            const temp = {};

            lectureAttrs.forEach((lecAttrs) => {
              temp[lecAttrs] = item.get(lecAttrs);
            });
            authorAttrs.forEach((authAttrs) => {
              temp.author[authAttrs] = item.get('author').get(authAttrs);
            });
            temp.objectId = item.id;
            this.lectureNote.push(temp);
          });

          this.loading = false;
        });
    },
  },
  created() {
    this.getFavLectures();
  },
};
</script>

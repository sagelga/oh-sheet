<template>
  <BoxedContainer class="top-gap bottom-gap">
    <div class="side-margin">
      <h1>รายการโน้ตที่ชื่นชอบ</h1>
      <div v-show="!loading && lectureNote.length === 0" style="text-align: center">
        <h3>ยังไม่ได้ติดดาวโน้ตเลคเชอร์ใดๆ</h3>
        <img src="/img/undraw_empty_xct9.svg" alt="empty" class="lecture-not-found">
      </div>
      <el-row :gutter="20" v-loading="loading" >
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
import ph from '@/helpers/parseHelper';
import ut from '@/helpers/util';

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
  created() {
    ph.getFavedLectures(this.userId)
      .then((lectureNotes) => {
        const lectureAttrs = ['objectId', 'title', 'categories', 'thumbnailPath', 'author'];
        const authorAttrs = ['objectId', 'username', 'avatarPath'];
        lectureNotes.forEach((l) => {
          const tempLecture = ut.getObjWithAttrs(l, lectureAttrs);
          tempLecture.author = ut.getObjWithAttrs(tempLecture.author, authorAttrs);
          this.lectureNote.push(tempLecture);
        });
        this.loading = false;
      });
  },
};
</script>

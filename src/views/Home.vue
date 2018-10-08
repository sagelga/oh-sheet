<template>
  <div>
    <BoxedContainer class="home-hero">
      <div class="side-margin">
        <h1>ค้นหาและแบ่งปันโน้ตเลคเชอร์</h1>
        <el-select v-model="chosenCategory">
          <el-option v-for="cat in categoryOptions" :key="cat" :label="cat" :value="cat">
          </el-option>
        </el-select>
      </div>
    </BoxedContainer>
    <!-- <hr id="home-divider"> -->
    <BoxedContainer class="bottom-gap home-section">
      <div class="side-margin">
        <h1>โน้ตเลคเชอร์ล่าสุด</h1>
        <el-row :gutter="20">
          <el-col v-for="lecture in lectureNotes"
                  :key="lecture.objectId"
                  :xs="24" :sm="8" :md="6">
            <LectureNoteCard :author="lecture.author" :lectureNote="lecture" />
          </el-col>
        </el-row>
      </div>
    </BoxedContainer>
  </div>
</template>

<style lang="sass">
.home-hero
  text-align: center
  padding-top: 6em
  padding-bottom: 6em
  background: url('/img/home-banner-1.png') bottom/cover no-repeat
  h1
    color: #fff
  .el-select
    font-family: 'Neue Helvetica W31', sans-serif
    .el-input input.el-input__inner
      font-size: 1.3em
      line-height: 1em
      padding-bottom: 0.3em
hr#home-divider
  margin: 2em 0
  border: 0
  height: 0
  border-top: 1px solid rgba(0, 0, 0, 0.1)
  border-bottom: 1px solid rgba(255, 255, 255, 0.3)
div.home-section
  padding-top: 2em
  padding-bottom: 2em
</style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';
import LectureNoteCard from '@/components/LectureNoteCard.vue';
import store from '@/store';

const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

export default {
  name: 'home',
  components: { BoxedContainer, LectureNoteCard },
  data() {
    return {
      chosenCategory: '',
      categoryOptions: ['สังคมศาสตร์', 'มนุษยศาสตร์', 'เกรียนศาสตร์', 'ไอศาสตร์'],
      lectureNotes: [],
    };
  },
  methods: {
    async getRecentLectures(n) {
      const LectureNote = Parse.Object.extend('LectureNote');
      const query = new Parse.Query(LectureNote);
      query.include('author');
      query.limit(n);
      const lectureNotes = await query.find();
      return lectureNotes;
    },
  },
  created() {
    this.getRecentLectures(8)
      .then((lectureNotes) => {
        const lectureAttrs = ['objectId', 'title', 'categories', 'thumbnailPath', 'author'];
        const authorAttrs = ['objectId', 'username', 'avatarPath'];
        lectureNotes.forEach((l) => {
          const tempLecture = {};

          lectureAttrs.forEach((lA) => {
            tempLecture[lA] = l.get(lA);
          });
          tempLecture.objectId = l.id;

          authorAttrs.forEach((aA) => {
            tempLecture.author[aA] = l.get('author').get(aA);
          });

          this.lectureNotes.push(tempLecture);
        });
      });
  },
};
</script>

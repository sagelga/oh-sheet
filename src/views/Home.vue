<template>
  <div>
    <BoxedContainer class="home-hero">
      <div class="side-margin">
        <h1>ค้นหาและแบ่งปันโน้ตเลคเชอร์</h1>
        <el-row :gutter="20" class="search-box-wrapper">
          <el-col :xs="24">
            <el-input v-model="searchQueries.keyword" placeholder="หัวข้อ"></el-input>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-select v-model="searchQueries.level" placeholder="ระดับชั้น">
              <el-option v-for="level in levelList"
                         :key="level.key" :label="level.value" :value="level.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-autocomplete :trigger-on-focus="false"
                             :fetch-suggestions="findSubjectSuggestions"
                             placeholder="วิชา"
                             v-model="searchQueries.tag">
            </el-autocomplete>
          </el-col>
        </el-row>
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
  padding-bottom: calc(6em - 20px)
  background: url('/img/home-banner-1.png') bottom/cover no-repeat
  h1
    color: #fff
  .search-box-wrapper
    margin-right: auto !important
    margin-left: auto !important
    max-width: 450px
  .el-select, .el-autocomplete
    width: 100%
  .el-input
    font-size: 1.2em
  .el-autocomplete, .el-input
    margin-bottom: 20px
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
import ph from '@/helpers/parseHelper';

export default {
  name: 'home',
  components: { BoxedContainer, LectureNoteCard },
  data() {
    return {
      searchQueries: {
        keyword: '',
        tag: '',
        level: '',
      },
      levelList: [
        { value: 'มัธยมต้น', key: 'lowerSecondary' },
        { value: 'มัธยมปลาย', key: 'upperSecondary' },
        { value: 'ปริญญาตรี', key: 'bachelor' },
      ],
      subjectList: [
        { value: 'Software Engineering' },
        { value: 'Management Information System' },
        { value: 'Requirement Engineering' },
      ],
      lectureNotes: [],
    };
  },
  methods: {
    findSubjectSuggestions(queryString, cb) {
      const results = queryString ?
        this.subjectList.filter(this.createFilter(queryString)) : this.subjectList;
      cb(results);
    },
    createFilter(queryString) {
      return subjectList =>
        subjectList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    },
  },
  created() {
    ph.getRecentLectures(8)
      .then((lectureNotes) => {
        const lectureAttrs = ['objectId', 'title', 'categories', 'thumbnailPath', 'author'];
        const authorAttrs = ['objectId', 'username', 'avatarPath'];
        lectureNotes.forEach((l) => {
          const tempLecture = {};

          lectureAttrs.forEach((lA) => { tempLecture[lA] = l.get(lA); });
          tempLecture.objectId = l.id;

          authorAttrs.forEach((aA) => { tempLecture.author[aA] = l.get('author').get(aA); });

          this.lectureNotes.push(tempLecture);
        });
      });
  },
};
</script>

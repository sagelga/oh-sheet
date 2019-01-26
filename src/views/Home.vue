<template>
  <div class="make-footer-sticky">
    <BoxedContainer class="home-hero">
      <div class="side-margin">
        <h1>ค้นหาและแบ่งปันโน้ตเลคเชอร์</h1>
        <el-row :gutter="20" class="search-box-wrapper">
          <el-col :xs="24">
            <el-input v-model="searchParam.title" placeholder="หัวข้อ"
                      id="home-title-input"></el-input>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-select v-model="searchParam.levelId" placeholder="ระดับชั้น">
              <el-option v-for="level in levelList"
                         :key="level.key" :label="level.value" :value="level.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-autocomplete :trigger-on-focus="false"
                             :fetch-suggestions="findCategorySuggestions"
                             placeholder="วิชา"
                             @select="handleCategorySelect"
                             v-model="searchParam.category">
              <template slot-scope="{ item }">
                <div class="value">{{ item.englishName }}</div>
              </template>
            </el-autocomplete>
          </el-col>
          <el-col :span="24">
            <el-button round
                       icon="el-icon-search"
                       :disabled="!isSearchButtonEnabled"
                   @click="search(searchParam.title, searchParam.levelId, searchParam.categoryId)">
              ค้นหา
            </el-button>
          </el-col>
        </el-row>
      </div>
    </BoxedContainer>
    <!-- <hr id="home-divider"> -->
    <BoxedContainer class="bottom-gap home-section">
      <div class="side-margin">
        <h1 v-show="showRecent">โน้ตเลคเชอร์ล่าสุด</h1>
        <h1 v-show="!showRecent">ผลการค้นหา</h1>
        <div class="query-label-wrap" v-show="!showRecent">
          <el-tag type="info" v-if="searchedParam.title">{{ searchedParam.title }}</el-tag>
          <el-tag type="info" v-if="searchedParam.category">{{ searchedParam.category }}</el-tag>
          <el-tag type="info" v-if="searchedParam.level">{{ searchedParam.level }}</el-tag>
        </div>
        <div v-loading="loading">
          <h3 v-show="!loading && !showRecent && lectureNotes.length === 0">
            ไม่พบโน้ตเลคเชอร์ที่ต้องการ
          </h3>
          <el-row :gutter="20" class="lecture-grid">
            <el-col v-for="lecture in lectureNotes" :key="lecture.objectId"
                    :xs="24" :sm="8" :md="6" style="margin-bottom: 1em">
              <LectureNoteCard :author="lecture.author" :lectureNote="lecture" />
            </el-col>
          </el-row>
        </div>
      </div>
    </BoxedContainer>
  </div>
</template>

<style lang="sass">
.home-hero
  padding-top: 5em
  padding-bottom: 5em
  background: url('/img/home-banner-1.png') bottom/cover no-repeat
  text-align: center
  transition: height .4s
  h1
    color: #fff
    text-shadow: 0 0 10px rgba(0,0,0,0.4)
  .search-box-wrapper
    margin-right: auto !important
    margin-left: auto !important
    max-width: 450px
  .el-select, .el-autocomplete
    width: 100%
  .el-input
    font-size: 1.2em
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
div.query-label-wrap
  margin-bottom: 1.5em
  .el-tag
    margin-right: 1em
</style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';
import LectureNoteCard from '@/components/LectureNoteCard.vue';
import ph from '@/helpers/parseHelper';
import ut from '@/helpers/util';

export default {
  name: 'home',
  components: { BoxedContainer, LectureNoteCard },
  data() {
    return {
      searchParam: {
        title: '',
        category: '',
        levelId: '',
        categoryId: '',
      },
      levelList: this.$store.state.levelList,
      categoryList: [],
      lectureNotes: [],
      showRecent: true,
      loading: true,
      searchedParam: {
        title: '',
        category: '',
        level: '',
      },
    };
  },
  computed: {
    store_categoryList() {
      return this.$store.state.categoryList;
    },
    isSearchButtonEnabled() {
      if (this.searchParam.title || this.searchParam.levelId || this.searchParam.categoryId) {
        return true;
      }
      return false;
    },
  },
  watch: {
    store_categoryList() {
      this.categoryList = this.store_categoryList;
    },
  },
  methods: {
    findCategorySuggestions(queryString, cb) {
      const results = queryString ?
        this.categoryList.filter(this.createFilter(queryString)) : this.categoryList;
      cb(results);
    },
    createFilter(queryString) {
      return categoryList =>
        categoryList.englishName.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    },
    handleCategorySelect(item) {
      this.searchParam.categoryId = item.objectId;
    },
    search(title, levelId, categoryId) {
      this.loading = true;
      this.showRecent = false;
      this.lectureNotes = [];
      ph.searchForLectures(title, levelId, categoryId)
        .then((lectures) => {
          const lectureAttrs = ['objectId', 'title', 'categories', 'thumbnailPath', 'author'];
          const authorAttrs = ['objectId', 'username', 'avatarPath'];
          lectures.forEach((l) => {
            const tempLecture = ut.getObjWithAttrs(l, lectureAttrs);
            tempLecture.author = ut.getObjWithAttrs(tempLecture.author, authorAttrs);
            this.lectureNotes.push(tempLecture);
          });
          this.loading = false;
        });
      this.searchedParam.title = this.searchParam.title;
      this.searchedParam.level = this.searchParam.levelId ? this.levelList[this.searchParam.levelId].value : '';
      this.searchedParam.category = this.searchParam.category;
    },
  },
  created() {
    if (this.$store.state.topSearchInput === '') {
      ph.getRecentLectures(4 * 3)
        .then((lectureNotes) => {
          const lectureAttrs = ['objectId', 'title', 'thumbnailPath', 'author'];
          const authorAttrs = ['objectId', 'username', 'avatarPath'];
          const catAttrs = ['objectId', 'englishName'];
          lectureNotes.forEach((l) => {
            const tempLecture = ut.getObjWithAttrs(l, lectureAttrs);
            tempLecture.author = ut.getObjWithAttrs(tempLecture.author, authorAttrs);
            tempLecture.categories = [];
            if (l.get('categories') !== undefined) {
              l.get('categories')
                .forEach((c) => {
                  const tempCat = ut.getObjWithAttrs(c, catAttrs);
                  tempLecture.categories.push(tempCat);
                });
            }
            this.lectureNotes.push(tempLecture);
          });
          this.loading = false;
        });
    } else {
      this.searchParam.title = this.$store.state.topSearchInput;
      this.search(this.searchParam.title, this.searchParam.levelId, this.searchParam.categoryId);
      this.$store.commit('updateTopSearchInput', '');
    }
  },
  mounted() {
    document.title = 'Explore | Oh Sheet!';
    this.$parent.$refs.topNav.$refs.topNavMenu.activeIndex = '/';
    this.categoryList = this.store_categoryList;
  },
};
</script>

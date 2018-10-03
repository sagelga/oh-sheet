<template>
  <BoxedContainer class="top-gap">
    <div class="row-wrap" v-if="!loading">
      <el-row v-if="!foundLecture">
        <el-col :xs="24" style="text-align: center;">
          <h1>ไม่พบโน้ตเลคเชอร์ที่ต้องการ</h1>
          <img src="/img/undraw_empty_xct9.svg" alt="not found" class="lecture-not-found">
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="foundLecture">
        <el-col :xs="24" :md="17">
          <object :data="lectureNote.filePath" type="application/pdf" class="pdf-viewer"></object>
        </el-col>
        <el-col :xs="24" :md="7">
          <el-card class="note-meta-card">
            <h1>{{ lectureNote.title }}</h1>
            <router-link to="">
              <h2>{{ lectureNote.categories[0] }}</h2>
            </router-link>
            <DateText :dateObj="lectureNote.updatedAt"/>
            <UserChip :user="lectureNote.author" />
            <QualityThumbs :voteUp="lectureNote.voteUp" :voteDown="lectureNote.voteDown" />
            <hr style="margin-top: 0.5em">
            <el-button type="text" style="font-size: 1em" @click="reportDialogVisible = true">
              <span class="material-icons">report</span>
              รายงานเนื้อหาไม่เหมาะสม
            </el-button>
            <br>
            <router-link to="./edit/">
              <span class="material-icons">edit</span>
              แก้ไข
            </router-link>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="reportDialogVisible" width="30%">
      <span>ต้องการส่งรายงานความไม่เหมาะสมหรือไม่</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reportDialogVisible = false">ยกเลิก</el-button>
        <el-button type="primary" @click="reportDialogVisible = false">ส่ง</el-button>
      </span>
    </el-dialog>
  </BoxedContainer>
</template>

<style lang="scss">
  .note-meta-card {
    h1 {
      font-size: 1em;
      margin-bottom: 0.3rem;
    }
    h2 {
      font-size: 1em;
      font-weight: normal;
      margin-bottom: 0.6rem;
    }
    .date-text {
      margin-bottom: 0.8rem;
    }
  }

  .pdf-viewer {
    width: 100%;
    height: 70vh;
  }

  .lecture-not-found {
    width: 100%;
    max-width: 360px;
    margin-top: 2em;
  }
</style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';
import UserChip from '@/components/UserChip.vue';
import DateText from '@/components/DateText.vue';
import QualityThumbs from '@/components/QualityThumbs.vue';

const Parse = require('parse/dist/parse.min');

Parse.initialize('A7gOtAmlXetuUbCejDVjEPiyMJpR4ET9TSjDHiqP', 'UaRg8CWpNhY9WbkDk93Ki6LQZ7ssnQfVRMXYyRJr');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default {
  name: 'lectureNote',
  components: {
    BoxedContainer,
    UserChip,
    DateText,
    QualityThumbs,
  },
  data() {
    return {
      reportDialogVisible: false,
      lectureNote: {},
      loading: true,
      foundLecture: false,
    };
  },
  methods: {
    getLectureNote() {
      const LectureNote = Parse.Object.extend('LectureNote');
      const lectureQuery = new Parse.Query(LectureNote);

      lectureQuery.equalTo('objectId', this.$route.params.noteId);
      lectureQuery.include('author');

      lectureQuery.find().then((results) => {
        if (results.length !== 0) {
          const lectureFields = ['author', 'categories', 'filePath', 'title',
            'updatedAt', 'voteDown', 'voteUp'];
          lectureFields.forEach((f) => {
            this.lectureNote[f] = results[0].get(f);
          });
          const authorFields = ['username'];
          authorFields.forEach((f) => {
            this.lectureNote.author[f] = results[0].get('author').get(f);
          });
          this.foundLecture = true;
        } else {
          this.foundLecture = false;
        }
        this.loading = false;
      });
    },
  },
  created() {
    this.getLectureNote();
  },
};
</script>

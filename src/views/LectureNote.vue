<template>
  <BoxedContainer class="top-gap">
    <div class="row-wrap">
      <el-row :gutter="20">
        <el-col :xs="24" :md="17">
          <object data="" type="application/pdf" class="pdf-viewer"></object>
        </el-col>
        <el-col :xs="24" :md="7">
          <el-card class="note-meta-card">
            <h1 id="title"></h1>
            <router-link to="">
              <h2 id="cat"></h2>
            </router-link>
            <DateText :dateObj="new Date()"/>
            <UserChip avatar="/img/avatar.png"/>
            <QualityThumbs/>
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
</style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';
import UserChip from '@/components/UserChip.vue';
import DateText from '@/components/DateText.vue';
import QualityThumbs from '@/components/QualityThumbs.vue';

const Parse = require('parse/dist/parse.min');

Parse.initialize('A7gOtAmlXetuUbCejDVjEPiyMJpR4ET9TSjDHiqP', 'UaRg8CWpNhY9WbkDk93Ki6LQZ7ssnQfVRMXYyRJr');
Parse.serverURL = 'https://parseapi.back4app.com/';

const LectureNote = Parse.Object.extend('LectureNote');
const User = Parse.Object.extend('User');
const query = new Parse.Query(LectureNote);
query.equalTo('objectId', 'azDugQ1izn');
query.find().then((results) => {
  const voteUp = results[0].attributes.voteUp;
  const voteDown = results[0].attributes.voteDown;
  const filePath = results[0].attributes.filePath;
  const categories = results[0].attributes.categories[0];
  const title = results[0].attributes.title;
  const author_id = results[0].attributes.author.id;
  document.getElementsByTagName('object')[0].setAttribute('data', filePath);
  document.getElementById('title').innerHTML = title;
  document.getElementById('cat').innerHTML = categories;
  document.getElementById('voteUp').innerHTML = voteUp;
  document.getElementById('voteDown').innerHTML = voteDown;
  const query2 = new Parse.Query(User);
  query2.equalTo('objectId', author_id);
  query2.find().then((authorName) => {
    const username = authorName[0].attributes.username;
    document.getElementById('displayName').innerHTML = username;
  });
});

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
    };
  },
  methods: {
    mounted() {
    },
  },
};
</script>

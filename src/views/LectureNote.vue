<template>
  <BoxedContainer class="top-gap">
    <div class="row-wrap">
      <el-row :gutter="20">
        <el-col :xs="24" :md="17">
          <object data="http://www.orimi.com/pdf-test.pdf" type="application/pdf" class="pdf-viewer"></object>
        </el-col>
        <el-col :xs="24" :md="7">
          <el-card class="note-meta-card">
            <h1>พฤติกรรมผู้บริโภค</h1>
            <router-link to="">
              <h2>มนุษยศาสตร์</h2>
            </router-link>
            <DateText :dateObj="new Date()"/>
            <UserChip avatar="/img/avatar.png" displayName="Nathan"/>
            <QualityThumbs voteUp="10" voteDown="2" />
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

export default {
  name: 'lectureNote',
  components: {
    BoxedContainer, UserChip, DateText, QualityThumbs,
  },
  data() {
    return {
      reportDialogVisible: false,
    };
  },
};
</script>

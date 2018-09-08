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
            <h2>มนุษยศาสตร์</h2>
            <UserChip avatar="/img/avatar.png" displayName="Nathan"/>
            <DateText :dateObj="new Date()"/>
            <!-- <QualityThumbs voteUp="" voteDown="" /> -->
            <hr style="margin-top: 1.3em">
            <el-button type="text" style="font-size: 1em">รายงานเนื้อหาไม่เหมาะสม</el-button>
            <br>
            <router-link to="./edit/">แก้ไข</router-link>
          </el-card>
        </el-col>
      </el-row>
    </div>
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
      margin-bottom: 0.5rem;
    }
    .user-chip, .date-text {
      margin-bottom: 0.5rem;
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

export default {
  name: 'lectureNote',
  components: {
    BoxedContainer, UserChip, DateText,
  },
};
</script>

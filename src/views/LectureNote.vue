<template>
  <BoxedContainer class="top-gap">
    <el-row :gutter="20">
      <el-col :span="16">
        <h1>Lecture Note</h1>
      </el-col>
      <el-col :span="8">
        <el-card class="note-meta-card">
          <h1>พฤติกรรมผู้บริโภค</h1>
          <h2>มนุษยศาสตร์</h2>
          <!-- <AuthorChip avatar="" displayName=""/> -->
          <!-- <DateText date=""/> -->
          <!-- <QualityThumbs voteUp="" voteDown="" /> -->
        </el-card>
      </el-col>
    </el-row>
  </BoxedContainer>
</template>

<style lang="scss">
  .note-meta-card {
    h1 {
      font-size: 1em;
    }
    h2 {
      font-size: 1em;
      font-weight: normal;
    }
  }
</style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';

export default {
  name: 'lectureNote',
  components: {
    BoxedContainer,
  },
};
</script>

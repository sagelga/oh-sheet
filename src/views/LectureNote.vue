<template>
  <BoxedContainer class="top-gap">
    <div class="row-wrap">
      <el-row :gutter="20">
        <el-col :xs="24" :md="16">
          <object data="http://www.orimi.com/pdf-test.pdf" type="application/pdf" class="pdf-viewer"></object>
        </el-col>
        <el-col :xs="24" :md="8">
          <el-card class="note-meta-card">
            <h1>พฤติกรรมผู้บริโภค</h1>
            <h2>มนุษยศาสตร์</h2>
            <!-- <AuthorChip avatar="" displayName=""/> -->
            <!-- <DateText date=""/> -->
            <!-- <QualityThumbs voteUp="" voteDown="" /> -->
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
    }
    h2 {
      font-size: 1em;
      font-weight: normal;
    }
  }
  .pdf-viewer {
    width: 100%;
    height: 70vh;
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

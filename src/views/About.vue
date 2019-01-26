<template>
  <div class="top-gap">
    <BoxedContainer>
      <h1>This is an about page</h1>
      <el-row :gutter="20">
        <el-col :span="6">
          <LectureNoteCard :author="author" :lectureNote="lecture" />
        </el-col>
      </el-row>
    </BoxedContainer>
  </div>
</template>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';
import LectureNoteCard from '@/components/LectureNoteCard.vue';

export default {
  name: 'about',
  components: { BoxedContainer, LectureNoteCard },
  data() {
    return {
      author: {
        id: 'mELanLKoFB',
        username: 'zartre',
      },
      lecture: {
        categories: ['สังคมศาสตร์'],
        filePath: 'http://www.orimi.com/pdf-test.pdf',
        title: 'พฤติกรรมผู้บริโภค',
        objectId: 'azDugQ1izn',
      },
    };
  },
};
</script>

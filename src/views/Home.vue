<template>
  <div class="home">
    <category>
      <center>
        <h1>ค้นหาและแบ่งปันโน้ตเลคเชอร์</h1>
        <p>ฉันอยากอ่าน</p>
        <select name="category" id="">
          <option value="1">มนุษย์ศาสตร์</option>
          <option value="2">สังคมศาสตร์</option>
          <option value="3">เกรียนศาสตร์</option>
        </select>
      </center>
    </category>
    <lecture>
      <h3>โน้ตเลคเชอร์ล่าสุด</h3>
      <BoxedContainer>
        <el-row :gutter="20">
          <el-col v-for="(item, index) in notes" :span="6">
            <LectureNoteCard :author="author" :lectureNote="lecture" />
          </el-col>
        </el-row>
      </BoxedContainer>
      <router-link to="/note/azDugQ1izn/">Lecture View</router-link>
    </lecture>
    <div id="test"></div>
  </div>
</template>

<style>
    p{
        display: inline-block;
        margin-right: 5px;
    }
</style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';
import LectureNoteCard from '@/components/LectureNoteCard.vue';

export default {
  name: 'home',
  components: { BoxedContainer, LectureNoteCard },
  data() {
    return {
      notes: [
        { message: 'Lecture1' },
        { message: 'Lecture2' },
        { message: 'Lecture3' },
        { message: 'Lecture4' },
      ],
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

<template>
  <div class="top-gap">
    <BoxedContainer>
      <h1 style="font-weight: 300; font-size: 1.5em">Parse Database Samples</h1>

      <section>
        <h1>1. Saving to Database</h1>
        <el-form :inline="true" :model="catFormData" :rules="catFormRules" ref="catForm">
          <el-form-item label="Name" prop="name">
            <el-input v-model="catFormData.name" placeholder="Umigo"></el-input>
          </el-form-item>
          <el-form-item label="Age" prop="age">
            <el-input v-model="catFormData.age" type="number"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary" @click="saveCat()" :disabled="catFormData.loading">
              {{ catFormData.loading ? 'Submitting' : 'Save' }}
            </el-button>
          </el-form-item>
        </el-form>
      </section>

      <section>
        <h1>2. Retrieving from Database</h1>
        <el-form :inline="true">
          <el-form-item label="Lecture Note ID">
            <el-input v-model="getLectureFormData.lectureId"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary" @click="getLecture()" :disabled="getLectureFormData.loading">
              {{ getLectureFormData.loading ? 'Submitting' : 'Get' }}
            </el-button>
          </el-form-item>
        </el-form>
        <el-card v-if="lectureNote.title && !getLectureFormData.loading">
          <ul>
            <li><pre>title</pre> {{ lectureNote.title }}</li>
            <li><pre>author.username</pre> {{ lectureNote.author.username }}</li>
            <li><pre>voteUp</pre> {{ lectureNote.voteUp }}</li>
            <li><pre>voteDown</pre> {{ lectureNote.voteDown }}</li>
            <li><pre>updatedAt</pre> {{ lectureNote.updatedAt }}</li>
          </ul>
        </el-card>
      </section>

    </BoxedContainer>
  </div>
</template>

<style scoped>
  section {
    margin-bottom: 2em;
  }
</style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';

const Parse = require('parse/dist/parse.min');

Parse.initialize('A7gOtAmlXetuUbCejDVjEPiyMJpR4ET9TSjDHiqP', 'UaRg8CWpNhY9WbkDk93Ki6LQZ7ssnQfVRMXYyRJr');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default {
  name: 'ParseSamples',
  components: {
    BoxedContainer,
  },
  data() {
    return {
      catFormData: {
        name: '',
        age: '',
        owner: 'mELanLKoFB',
        loading: false,
      },
      catFormRules: {
        name: [
          { required: true, message: 'A cat needs a name' },
        ],
        age: [
          { required: true, message: 'A cat needs an age' },
        ],
      },
      getLectureFormData: {
        lectureId: 'azDugQ1izn',
        loading: false,
      },
      lectureNote: {},
    };
  },
  methods: {
    saveCat() {
      this.$refs.catForm.validate((valid) => {
        if (valid) {
          this.catFormData.loading = true;

          // Create a new Cat object from class Cat
          const Cat = Parse.Object.extend('Cat');
          // Create kitty the Cat
          const kitty = new Cat();
          // Create a new User object from class User
          const User = Parse.Object.extend('User');
          // Create a pointer to kitty's owner
          const ownerPointer = new User().set('objectId', this.catFormData.owner);

          // Set kitty attributes
          kitty.set('name', this.catFormData.name);
          kitty.set('age', parseInt(this.catFormData.age, 10));
          kitty.set('owner', ownerPointer);

          kitty.save()
            .then((returnedKitty) => {
              this.$message({
                message: 'Saved to database with objectId: '.concat(returnedKitty.id),
                type: 'success',
              });
              this.catFormData.loading = false;
            }, (error) => {
              this.$message({
                message: error.message,
                type: 'error',
              });
              this.catFormData.loading = false;
            });
        }
        return false;
      });
    },
    getLecture() {
      this.getLectureFormData.loading = true;

      // Create a new LectureNote object from class LectureNote
      const LectureNote = Parse.Object.extend('LectureNote');
      // Create a query
      const lectureQuery = new Parse.Query(LectureNote);
      // Query from objectId
      lectureQuery.equalTo('objectId', this.getLectureFormData.lectureId);
      // Also query _User pointed in the author column
      lectureQuery.include('author');

      // Submit the query
      lectureQuery.find().then((results) => {
        // Declare fields (columns) that we want
        const lectureFields = ['author', 'categories', 'filePath', 'title',
          'updatedAt', 'voteDown', 'voteUp'];
        // Save those field to lectureNote
        lectureFields.forEach((f) => {
          this.lectureNote[f] = results[0].get(f);
        });
        // author is a nested object, so we need another 'save' statement
        const authorFields = ['username'];
        authorFields.forEach((f) => {
          this.lectureNote.author[f] = results[0].get('author').get(f);
        });

        this.getLectureFormData.loading = false;
      });
    },
  },
};
</script>

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

    </BoxedContainer>
  </div>
</template>

<style></style>

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
  },
};
</script>

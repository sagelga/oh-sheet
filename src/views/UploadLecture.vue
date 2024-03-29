<template>
  <BoxedContainer class="top-gap bottom-gap make-footer-sticky">
    <div class="side-margin">
      <el-row :gutter="20">
        <el-col :xs="24" :md="12">
          <h1>{{ action }}โน้ตเลคเชอร์</h1>
          <el-form :model="formData" :rules="formRules" ref="lectureForm" v-loading="loading">
            <el-form-item label="ชื่อโน้ต" prop="title">
              <el-input
                  v-model="formData.title"
                  size="large">
              </el-input>
            </el-form-item>
            <el-form-item label="ระดับชั้น" prop="levelId">
              <el-select v-model="formData.levelId" placeholder="ระดับชั้น" style="width: 100%">
                <el-option v-for="level in levelList"
                           :key="level.key" :label="level.value" :value="level.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="วิชา" prop="category">
              <el-select v-model="formData.category" filterable multiple allow-create
                         style="width: 100%">
                <el-option v-for="c in categoryList" :key="c.objectId" :label="c.englishName"
                           :value="c.objectId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="คำอธิบาย" prop="description">
              <el-input v-model="formData.description"
                        size="large"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        type="textarea"
                        prop="description">
              </el-input>
            </el-form-item>
            <div>
              <label class="el-form-item__label" style="float: none;">อัปโหลดไฟล์ PDF</label>
              <div style="font-size:0.85em; letter-spacing: 0.03em">ขนาดไฟล์ไม่เกิน 10 MB</div>
              <el-alert title="ตอนนี้มีไฟล์อยู่แล้ว แต่หากต้องการเปลี่ยนให้ลากไฟล์มาใหม่ได้เลย"
                        type="warning" :closable="false" show-icon
                        v-show="formData.objectId"></el-alert>
            </div>
            <div id="my-awesome-dropzone" class="dropzone"></div>
          </el-form>
          <div style="margin-top: 20px">
            <el-button type="primary"
                       @click="saveLecture()"
                       :disabled="!isSubmitBtnClickable">
              บันทึก
            </el-button>
            <el-button v-if="formData.objectId" @click="cancelEdit">ยกเลิก</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </BoxedContainer>
</template>

<style scoped>
</style>

<script>
import 'dropzone/dist/dropzone.css';
import BoxedContainer from '@/components/BoxedContainer.vue';
import store from '@/store';
import ph from '@/helpers/parseHelper';
import ut from '@/helpers/util';

const Dropzone = require('dropzone');
const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

export default {
  name: 'uploadLecture',
  components: {
    BoxedContainer,
  },
  data() {
    return {
      action: 'เพิ่ม',
      isSubmitBtnClickable: false,
      loading: true,
      orgFormData: {},
      formData: {
        objectId: '',
        description: '',
        title: '',
        levelId: '',
        category: [],
        categoryId: [],
        filePath: '',
        thumbnailPath: '',
      },
      levelList: this.$store.state.levelList,
      categoryList: [],
      formRules: {
        title: [
          { required: true, message: 'กรุณากรอกชื่อ' },
        ],
        levelId: [
          { required: true, message: 'กรุณาเลือกระดับชั้น' },
        ],
        category: [
          { required: true, message: 'กรุณาเลือกวิชา' },
        ],
      },
    };
  },
  computed: {
    store_categoryList() {
      return this.$store.state.categoryList;
    },
  },
  watch: {
    store_categoryList() {
      this.categoryList = this.store_categoryList;
    },
  },
  methods: {
    findCategorySuggestions(queryString, cb) {
      const results = queryString ?
        this.categoryList.filter(this.createFilter(queryString)) : this.categoryList;
      cb(results);
    },
    createFilter(queryString) {
      return categoryList =>
        categoryList.englishName.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    },
    cancelEdit() {
      this.$router.push('../');
    },
    saveLecture() {
      this.$refs.lectureForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          this.isSubmitBtnClickable = false;
          this.formData.categoryId = [];

          // Array of currently-available categories' ID
          const currentCat = this.categoryList.map(c => c.objectId);
          // Update categoryId with chosen categories (that are already available)
          const tempChosen = this.formData.category.filter(c => currentCat.includes(c));
          // Find user-created categories (the ones that don't exist yet)
          const newCategories = ut.getNewCategory(this.formData.category, this.categoryList);
          for (let i = 0; i < newCategories.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const tempNewCat = await ph.createLectureCategory(newCategories[i]);
            tempChosen.push(tempNewCat.id);
          }
          tempChosen.forEach(i => this.formData.categoryId.push(i));

          ph.saveLectureNote(this.formData, Parse.User.current().id)
            .then((returnedNote) => {
              /* if (this.$router.currentRoute.path.match(/^\/upload(?:\/(?=$))?$/i)) {
                const notiParams = {
                  authorId: Parse.User.current().id,
                  link: `/note/${returnedNote.id}/`,
                  // eslint-disable-next-line
                  detail: `${this.$store.state.username} ได้อัปโหลดเลคเชอร์ใหม่ "${returnedNote.get('title')}" ดูเลย!`,
                  thumbnail: Parse.User.current().get('avatarPath'),
                };
                Parse.Cloud.run('notifySubscribers', notiParams);
              } */
              if (returnedNote.id) this.$router.push(`/note/${returnedNote.id}/`);
              else this.$router.push(`/profile/${this.$store.state.username}/`);
              this.loading = false;
            }, (error) => {
              this.$message({
                message: error.message,
                type: 'error',
              });
              this.loading = false;
              this.isSubmitBtnClickable = true;
            });
        }
        return false;
      });
    },
    getLectureNote(noteId) {
      ph.getLectureNote(noteId).then((result) => {
        if (result) {
          const lectureAttrs = ['id', 'categories', 'filePath', 'thumbnailPath',
            'title', 'levels', 'description'];
          const lvlAttrs = ['id'];
          const catAttrs = ['id', 'value'];
          this.orgFormData = ut.getObjWithAttrs(result, lectureAttrs);
          this.orgFormData.categories = [];
          this.orgFormData.levels = [];
          if (result.get('categories') !== undefined) {
            result.get('categories')
              .forEach((c) => {
                const tempCat = ut.getObjWithAttrs(c, catAttrs);
                this.orgFormData.categories.push(tempCat);
              });
          }
          if (result.get('levels') !== undefined) {
            result.get('levels')
              .forEach((l) => {
                const tempLvl = ut.getObjWithAttrs(l, lvlAttrs);
                this.orgFormData.levels.push(tempLvl);
              });
          }
          this.loading = false;
          this.copyOrgToFormData();
          this.isSubmitBtnClickable = true;
        } else {
          // show a dialog and then push to home page
          this.loading = false;
        }
      }); // TODO: Add catch
    },
    copyOrgToFormData() {
      const lectureAttrs = ['filePath', 'thumbnailPath', 'title', 'description'];
      lectureAttrs.forEach((a) => { this.formData[a] = this.orgFormData[a]; });
      this.formData.objectId = this.orgFormData.objectId;
      this.orgFormData.categories.forEach((c) => {
        this.formData.categoryId.push(c.objectId);
        this.formData.category.push(c.objectId);
      });
      if (this.orgFormData.levels[0] !== undefined || this.orgFormData.levels.length !== 0) {
        this.formData.levelId = this.orgFormData.levels[0].objectId;
      }
    },
  },
  created() {
    this.$parent.$refs.topNav.$refs.topNavMenu.activeIndex = '/upload/';
    this.categoryList = this.store_categoryList;
    if (this.$router.currentRoute.params.action === 'edit') {
      this.action = 'แก้ไข';
      this.getLectureNote(this.$route.params.noteId);
      // copy this.orgFormData to this.formData
    } else {
      this.loading = false;
    }
  },
  mounted() {
    document.title = 'Edit Lecture | Oh Sheet!';
    Dropzone.autoDiscover = false;
    if (document.getElementsByClassName('dz-hidden-input').length > 0) {
      document.getElementsByClassName('dz-hidden-input')[0].remove();
    }
    ph.getLectureCategories()
      .then((categories) => {
        const tempCategories = [];
        const catAttrs = ['objectId', 'thaiName', 'englishName', 'value'];
        categories.forEach((c) => {
          tempCategories.push(ut.getObjWithAttrs(c, catAttrs));
        });
        this.$store.commit('updateCategoryList', tempCategories);
      });
    const myDropzone = new Dropzone('div#my-awesome-dropzone', {
      url: store.state.endpoints.uploadHandler.concat('/upload-lecture-notes'),
      paramName: 'upload',
      maxFiles: 1,
      maxFilesize: 10, // MB
      acceptedFiles: 'application/pdf',
      headers: {
        'Cache-Control': '',
        'X-Requested-With': '',
      },
    });
    myDropzone.on('success', (f, r) => {
      if (r.status === 200) {
        this.formData.filePath = r.message.filePath;
        this.formData.thumbnailPath = r.message.thumbnailPath;
        this.isSubmitBtnClickable = true;
      }
    });
  },
};
</script>

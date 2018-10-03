 <template>
    <BoxedContainer class="top-gap">
        <div class="row-wrap">
            <el-row :gutter="20">
                <el-col :span="10" :offset="2">
                    <h1>เพิ่ม Lecture Note</h1>
                    <form>
                        <p align="left">ชื่อ Lecture Note</p>
                        <el-input
                                v-model="lectureName"
                                clearable="" size="large"
                                class=""
                                type="text">
                        </el-input>
                        <p align="left">หมวดหมู่</p>
                        <el-cascader
                                class="option"
                                expand-trigger="hover"
                                :options="subjectOptions"
                                v-model="selectedSubject">
                        </el-cascader>
                        <p align="left">แท็ก</p>
                        <el-select
                                class="option"
                                v-model="lectureTag"
                                multiple
                                filterable
                                allow-create
                                default-first-option>
                            <el-option
                                    v-for="item in tagOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <p align="left">คำอธิบายเพิ่มเติม</p>
                        <el-input v-model="lectureDescription"
                                  clearable=""
                                  size="large"
                                  class=""
                                  :autosize="{ minRows: 2, maxRows: 4 }"
                                  type="textarea">
                        </el-input>
                        <p align="left">อัปโหลดไฟล์ Lecture Note</p>
                        <div id="my-awesome-dropzone" class="dropzone"></div>
                    </form>
                    <div style="margin-top: 20px">
                        <el-button type="primary" @click="saveLecture()">อัปโหลด</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </BoxedContainer>
</template>

<style type="text/css">
  .option {
    width: 100%;
  }
</style>

<script>
const Dropzone = require('dropzone');
const Parse = require('parse/dist/parse.min');
Parse.initialize('A7gOtAmlXetuUbCejDVjEPiyMJpR4ET9TSjDHiqP', 'UaRg8CWpNhY9WbkDk93Ki6LQZ7ssnQfVRMXYyRJr');
Parse.serverURL = 'https://parseapi.back4app.com/';
import 'dropzone/dist/dropzone.css';
import BoxedContainer from '@/components/BoxedContainer.vue';

export default {
  name: 'uploadLecture',
  components: {
    BoxedContainer,
  },
  data() {
    return {
      lectureDescription: '',
      lectureName: '',
      tagOptions: [{
        value: 'ไทย',
        label: 'ไทย',
      }, {
        value: 'สังคม',
        label: 'สังคม',
      }, {
        value: 'อังกฤษ',
        label: 'อังกฤษ',
      }],
      lectureTag: [],
      subjectOptions: [{
        value: 'มัธยมต้น',
        label: 'มัธยมต้น',
        children: [{
          value: 'คณิตศาสตร์',
          label: 'คณิตศาสตร์',
        }, {
          value: 'ภาษาไทย',
          label: 'ภาษาไทย',
        }],
      }, {
        value: 'มัธยมปลาย',
        label: 'มัธยมปลาย',
        children: [{
          value: 'เคมี',
          label: 'เคมี',
        }, {
          value: 'ฟิสิกส์',
          label: 'ฟิสิกส์',
        }, {
          value: 'ชีววิทยา',
          label: 'ชีววิทยา',
        }],
      }, {
        value: 'อุดมศึกษา',
        label: 'อุดมศึกษา',
      }],
      selectedSubject: [],
      fileList: [],
    };
  },
  methods: {
    saveLecture() {
      this.$refs.lectureForm.validate((valid) => {
        if (valid) {
          this.lectureFormData.loading = true;

          // Create a new Cat object from class Cat
          const Lecture = Parse.Object.extend('Lecture');
          // Create kitty the Cat
          const note = new Lecture();
          // Create a new User object from class User
          const User = Parse.Object.extend('User');
          // Create a pointer to kitty's owner
          const ownerPointer = new User().set('objectId', this.lectureFormData.owner);

          // Set kitty attributes
          note.set('category', this.lectureFormData.tagOptions)
          note.set('description', this.lectureFormData.lectureDescription);
          note.set('title', this.lectureFormData.lectureName)
      
          note.save()
            .then((returnedNote) => {
              this.$message({
                message: 'Saved to database with objectId: '.concat(returnedNote.id),
                type: 'success',
              });
              this.lectureFormData.loading = false;
            }, (error) => {
              this.$message({
                message: error.message,
                type: 'error',
              });
              this.lectureFormData.loading = false;
            });
        }
        return false;
      });
    }
  },
  mounted() {
    Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone("div#my-awesome-dropzone", {
      url: 'https://pony.zartre.com/upload-lecture-notes',
      paramName: 'upload',
      maxFiles: 1,
      maxFilesize: 2, // MB
      headers: {
        'Cache-Control': '',
        'X-Requested-With': '',
      },
    });
  },
};
</script>

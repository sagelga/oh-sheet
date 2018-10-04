 <template>
    <BoxedContainer class="top-gap">
        <div class="row-wrap">
            <el-row :gutter="20">
                <el-col :span="10" :offset="2">
                    <h1>เพิ่ม Lecture Note</h1>
                    <el-form :model="formData" :rules="formRules" ref="lectureForm">
                        <p align="left">ชื่อ Lecture Note</p>
                        <el-input
                                v-model="formData.title"
                                clearable="" size="large">
                        </el-input>
                        <p align="left">หมวดหมู่</p>
                        <el-cascader
                                class="option"
                                expand-trigger="hover"
                                :options="subjectOptions"
                                v-model="formData.categories">
                        </el-cascader>
                        <!--p align="left">แท็ก</p>
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
                        </el-select-->
                        <p align="left">คำอธิบายเพิ่มเติม</p>
                        <el-input v-model="formData.description"
                                  size="large"
                                  :autosize="{ minRows: 2, maxRows: 4 }"
                                  type="textarea">
                        </el-input>
                        <p align="left">อัปโหลดไฟล์ Lecture Note</p>
                        <div id="my-awesome-dropzone" class="dropzone"></div>
                    </el-form>
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
import 'dropzone/dist/dropzone.css';
import BoxedContainer from '@/components/BoxedContainer.vue';

const Dropzone = require('dropzone');
const Parse = require('parse/dist/parse.min');

Parse.initialize('A7gOtAmlXetuUbCejDVjEPiyMJpR4ET9TSjDHiqP', 'UaRg8CWpNhY9WbkDk93Ki6LQZ7ssnQfVRMXYyRJr');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default {
  name: 'uploadLecture',
  components: {
    BoxedContainer,
  },
  data() {
    return {
      loading: false,
      orgFormData: {},
      formData: {
        description: '',
        title: '',
        categories: '',
        filePath: '',
      },
      /*tagOptions: [{
        value: 'ไทย',
        label: 'ไทย',
      }, {
        value: 'สังคม',
        label: 'สังคม',
      }, {
        value: 'อังกฤษ',
        label: 'อังกฤษ',
      }],*/
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
      formRules: {
        name: [
          { required: true, message: 'A lecture needs a name' },
        ],
        description: [
          { required: true, message: 'A lecture needs an description' },
        ],
      },
    };
  },
  methods: {
    saveLecture() {
      this.$refs.lectureForm.validate((valid) => {
        if (valid) {
          this.loading = true;

          // Create a new Lecture object from class LectureNote
          const Lecture = Parse.Object.extend('LectureNote');
          // Create note the Lecture
          const note = new Lecture();
          // Create a new User object from class User
          const User = Parse.Object.extend('User');
          // Create a pointer to note's author
          const authorPointer = new User().set('objectId', Parse.User.current().id);

          // Set note attributes
          const fields = Object.keys(this.formData);
          fields.forEach((f) => {
            note.set(f, this.formData[f]);
          });
          note.set('author', authorPointer);
      
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

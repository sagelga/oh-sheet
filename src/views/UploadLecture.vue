<template>
    <BoxedContainer class="top-gap">
        <div class="row-wrap">
            <el-row :gutter="20">
                <el-col :span="10" :offset="2">
                    <div>
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
                                    v-model="selectedSubject"
                                    @change="handleChange">
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
                            <el-upload
                                    drag
                                    action=""
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="fileList"
                                    multiple
                                    style="width: max-content"
                            >
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">ลากไฟล์มาที่นี่ หรือ
                                    <em> คลิกเพื่ออัปโหลด</em>
                                </div>
                                <div class="el-upload__tip" slot="tip">
                                    ขนาดไม่เกิน xxx MB
                                </div>
                            </el-upload>
                        </form>
                    </div>
                    <div style="margin-top: 20px">
                        <el-button type="primary">อัปโหลด</el-button>
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
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};

const uploadLecture = () => {
const fs = require('fs');
const path = require('path');
var AWS = require('aws-sdk');

var accessKeyId = 'QASRGUKV45BJ4LO5DK3S';
var secretAccessKey = 'RToDzC/KgTJ1aRavTn5w9fADYXt8OQ5XdhgZeA8esf4';
var region = 'sgp1';

var spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
var s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey 
});
var bucketName = 'pony';
var filePath = './testnaja2.jpeg';
var params = {
    Bucket: bucketName,
    Key: path.basename(filePath),
    Body: fs.createReadStream(filePath)
};

var options = {
    partSize: 10 * 1024 * 1024, // 10 MB
    queueSize: 10
};

s3.upload(params, options, function (err, data) {
    if (!err) {
        console.log(data); // successful response
    } else {
        console.log(err); // an error occurred
    }
});
}
</script>

<template>
  <BoxedContainer v-loading="loadingProfile" class="top-gap bottom-gap make-footer-sticky">
    <div class="profile-meta">
      <div class="profile-pic" :class="{ 'clickable': isViewingSelf }"
           @click="avatarDialogToggle()">
        <img :src="showAvatar()" :alt="user.username" class="avatar">
        <div class="edit">
          <i class="material-icons">edit</i>
        </div>
      </div>
      <h1>{{ user.username }}</h1>
      <div class="achievements" v-if="!loadingProfile && user.achievements">
        <el-tooltip effect="dark" content="ใช้งานติดต่อกัน 7 วัน" placement="bottom"
                    v-if="user.achievements.maxLoginStreak >= 7">
          <img src="/img/reward_badge/7days.jpg">
        </el-tooltip>
        <el-tooltip effect="dark" content="ใช้งานติดต่อกัน 1 เดือน" placement="bottom"
                    v-if="user.achievements.maxLoginStreak >= 30">
          <img src="/img/reward_badge/1month.jpg">
        </el-tooltip>
        <el-tooltip effect="dark" content="อัปโหลด 20 เลคเชอร์" placement="bottom"
                    v-if="lectureNotes.length >= 20">
          <img src="/img/reward_badge/20upload.jpg">
        </el-tooltip>
        <el-tooltip effect="dark" content="อัปโหลด 50 เลคเชอร์" placement="bottom"
                    v-if="lectureNotes.length >= 50">
          <img src="/img/reward_badge/50upload.jpg">
        </el-tooltip>
        <el-tooltip effect="dark" content="อัปโหลด 100 เลคเชอร์" placement="bottom"
                    v-if="lectureNotes.length >= 100">
          <img src="/img/reward_badge/100upload.jpg">
        </el-tooltip>
        <el-tooltip effect="dark" content="อัปโหลดครั้งแรก" placement="bottom"
                    v-if="lectureNotes.length >= 1">
          <img src="/img/reward_badge/1st_upload.jpg">  
        </el-tooltip>
        <el-tooltip effect="dark" content="Early Bird" placement="bottom"
                    v-if="user.achievements.earlyBird == true">
          <img src="/img/reward_badge/register.jpg">
        </el-tooltip>
      </div>
      <!--div v-if="isViewingSelf">
        <el-button round size="mini" @click="pinLectureDialogVisible = true">
          ปักหมุดเลคเชอร์
        </el-button>
      </div-->
    </div>
    <div class="side-margin">
      <el-row :gutter="20" class="lecture-grid"
              v-loading="loadingLectureNotes">
        <el-col :span="6" v-for="lecture in lectureNotes" :key="lecture.objectId"
                :xs="24" :sm="8" :md="6" style="margin-bottom: 1em">
          <LectureNoteCard :author="user" :lecture-note="lecture" />
        </el-col>
      </el-row>
      <div v-if="hasNoLecture" style="text-align: center">
        <h3>ผู้ใช้นี้ยังไม่ได้อัปโหลดโน้ตเลคเชอร์</h3>
        <img src="/img/undraw_empty_xct9.svg" alt="empty" class="lecture-not-found">
      </div>
    </div>

    <el-dialog :visible.sync="changeAvatarDialogVisible" title="เปลี่ยนรูปโปรไฟล์">
      <div style="font-size:0.85em; letter-spacing: 0.03em">ขนาดไฟล์ไม่เกิน 1 MB</div>
      <div id="avatar-dropzone" class="dropzone"></div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="changeAvatarDialogVisible = false">ยกเลิก</el-button>
          <el-button type="primary"
                     :disabled="!isSubmitBtnClickable"
                     @click="uploadAvatar()">บันทึก</el-button>
        </span>
    </el-dialog>
    <!--el-dialog class="pin-lecture-dialog"
               :visible.sync="pinLectureDialogVisible" title="ปักหมุดโน้ตเลคเชอร์">
      <el-checkbox-group v-model="lectureIdsToPin" :max="2">
        <div class="checkbox-wrap" v-for="lec in lectureNotes" :key="lec.objectId">
          <el-checkbox :label="lec.title"></el-checkbox>
        </div>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pinLectureDialogVisible = false">ยกเลิก</el-button>
        <el-button type="primary">บันทึก</el-button>
      </span>
    </el-dialog-->
  </BoxedContainer>
</template>

<style scoped lang="sass">
  .profile-meta
    opacity: 1
    max-width: 300px
    margin: 0 auto 2em
    text-align: center
    .achievements
      margin-bottom: 1em
      img
        display: inline-block
        width: 36px
        border-radius: 4px
        &:not(:last-child)
          margin-right: 1em
  .profile-pic
    position: relative
    width: 128px
    text-align: center
    margin: 0 auto
    &.clickable
      cursor: pointer
      &:hover
        .edit
          opacity: 1
        img
          opacity: 0.4
    img.avatar
      position: relative
      width: 128px
      height: 128px
      border-radius: 50%
      box-shadow: 0 10px 10px -5px rgba(0,0,0,0.2)
      transition: .5s ease
    .edit
      position: absolute
      top: 52px
      left: 52px
      width: 24px
      height: 24px
      background-color: #409eff
      border-radius: 15px
      opacity: 0
      transition: .5s ease
      i
        padding-left: 1px
        padding-top: 2px
        color: #fff
  .checkbox-wrap
    border-top: 1px solid #e6e6e6
    &:last-of-type
      border-bottom: 1px solid #e6e6e6
    &:hover
      background-color: #ecf5ff
    .el-checkbox
      padding: 0.6em
</style>

<script>
import 'dropzone/dist/dropzone.css';
import store from '@/store';
import BoxedContainer from '@/components/BoxedContainer.vue';
import LectureNoteCard from '@/components/LectureNoteCard.vue';
import ph from '@/helpers/parseHelper';
import ut from '@/helpers/util';

const Dropzone = require('dropzone');
const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

export default {
  name: 'Profile',
  components: { LectureNoteCard, BoxedContainer },
  data() {
    return {
      loading: true,
      isSubmitBtnClickable: false,
      loggedInUserId: Parse.User.current() ? Parse.User.current().id : null,
      loggedInUsername: Parse.User.current() ? Parse.User.current().getUsername() : null,
      user: {},
      userFields: ['avatarPath', 'username', 'createdAt', 'achievements'],
      lectureNotes: [],
      loadingProfile: true,
      loadingLectureNotes: true,
      foundProfile: false,
      changeAvatarDialogVisible: false,
      newAvatar: '/img/avatar.png',
      pinLectureDialogVisible: false,
      lectureIdsToPin: [],
    };
  },
  computed: {
    hasNoLecture() {
      return !this.loadingLectureNotes && this.lectureNotes.length === 0;
    },
    isViewingSelf() {
      return this.loggedInUsername === this.$route.params.username;
    },
  },
  methods: {
    showAvatar() {
      if (this.user.avatarPath) {
        return `${store.state.endpoints.objectStorage}/${this.user.avatarPath}`;
      }
      return '/img/avatar.png';
    },
    avatarDialogToggle() {
      if (this.isViewingSelf) {
        this.changeAvatarDialogVisible = true;
        if (document.getElementsByClassName('dz-hidden-input').length > 0) {
          document.getElementsByClassName('dz-hidden-input')[0].remove();
        }
        setTimeout(() => {
          const myDropzone = new Dropzone('div#avatar-dropzone', {
            url: store.state.endpoints.uploadHandler.concat('/upload-misc'),
            paramName: 'upload',
            maxFiles: 1,
            maxFilesize: 1, // MB
            acceptedFiles: 'image/png, image/jpeg, image/gif, image/bmp',
            headers: {
              'Cache-Control': '',
              'X-Requested-With': '',
            },
          });
          myDropzone.on('success', (f, r) => {
            if (r.status === 200) {
              this.newAvatar = r.message.filePath;
              this.isSubmitBtnClickable = true;
            }
          });
        }, 300);
      }
    },
    uploadAvatar() {
      Parse.User.current().set('avatarPath', this.newAvatar);
      Parse.User.current().save().then(() => {
        this.changeAvatarDialogVisible = false;
        // eslint-disable-next-line
        location.reload();
      });
    },
  },
  created() {
    Dropzone.autoDiscover = false;
    ph.getUserProfile(this.$route.params.username)
      .then((user) => {
        this.userFields.forEach((f) => {
          this.user[f] = user.get(f);
        });
        this.user.objectId = user.id;
        this.loadingProfile = false;
        this.foundProfile = true;
        ph.getLecturesOfUserPointer(user)
          .then((lectureNotes) => {
            lectureNotes.forEach((lec) => {
              const wantedAttrs = ['objectId', 'title', 'description', 'categories', 'thumbnailPath'];
              this.lectureNotes.push(ut.getObjWithAttrs(lec, wantedAttrs));
            });
            this.loadingLectureNotes = false;
          });
        document.title = `${this.user.username} | Oh Sheet!`;
        this.$parent.$refs.topNav.$refs.topNavMenu.activeIndex = `/profile/${this.user.username}/`;
      });
  },
};
</script>

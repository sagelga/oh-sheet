<template>
  <BoxedContainer v-loading="loadingProfile" class="top-gap bottom-gap">
    <div class="profile-meta">
      <div class="profile-pic" @click="changeAvatarDialogVisible = true">
        <img :src="user.avatarPath || '/img/avatar.png'" :alt="user.username" class="avatar">
          <div class="edit">
            <i class="material-icons" style="position: absolute">edit</i>
          </div>
      </div>
      <h1>{{ user.username }}</h1>
      <div class="achievements" v-if="!loadingProfile && user.achievements">
        <el-tooltip effect="dark" content="ใช้งานติดต่อกัน 7 วัน" placement="bottom"
                    v-if="user.achievements.maxLoginStreak >= 7">
          <img src="/img/reward_badge/7days.jpg">
        </el-tooltip>
      </div>
    </div>
    <el-row :gutter="20" v-loading="loadingLectureNotes">
      <div v-show="!loadingLectureNotes && lectureNotes.length === 0" style="text-align: center">
        <h3>ผู้ใช้นี้ยังไม่ได้อัปโหลดโน้ตเลคเชอร์</h3>
        <img src="/img/undraw_empty_xct9.svg" alt="empty" class="lecture-not-found">
      </div>
      <el-col :span="6" v-for="lecture in lectureNotes" :key="lecture.objectId">
        <LectureNoteCard :author="user" :lecture-note="lecture" />
      </el-col>
    </el-row>

    <el-dialog :visible.sync="changeAvatarDialogVisible" title="เปลี่ยนรูปโปรไฟล์">
      <span slot="footer" class="dialog-footer">
        <el-button @click="reportDialogVisible = false">ยกเลิก</el-button>
        <el-button type="primary" @click="submitReport">ส่ง</el-button>
      </span>
    </el-dialog>

  </BoxedContainer>
</template>

<style scoped lang="sass">
.profile-meta
  opacity: 1
  max-width: 300px
  margin: 0 auto 2em
  text-align: center
  img.avatar
    position: relative
    width: 128px
    height: 128px
    border-radius: 50%
    box-shadow: 0 10px 10px -5px rgba(0,0,0,0.2)
    transition: .5s ease
  .achievements img
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
.profile-pic:hover img
  cursor: pointer
  display: inline-block
  opacity: 0.6
.profile-pic:hover .edit
  display: inline-block
  opacity: 1
.edit
  transition: .5s ease
  padding-top: 5px
  padding-right: 5px
  position: absolute
  right: 0
  top: 0
  opacity: 0
</style>

<script>
import store from '@/store';
import BoxedContainer from '@/components/BoxedContainer.vue';
import LectureNoteCard from '@/components/LectureNoteCard.vue';
import ph from '@/helpers/parseHelper';
import ut from '@/helpers/util';

const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

export default {
  name: 'Profile',
  components: { LectureNoteCard, BoxedContainer },
  data() {
    return {
      user: {},
      userFields: ['avatarPath', 'username', 'createdAt', 'achievements'],
      lectureNotes: [],
      loadingProfile: true,
      loadingLectureNotes: true,
      foundProfile: false,
      changeAvatarDialogVisible: false,
    };
  },
  created() {
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

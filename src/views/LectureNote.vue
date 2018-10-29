<template>
  <BoxedContainer class="top-gap" >
    <div v-loading="loading">
      <div class="side-margin" v-if="!loading">
        <el-row v-if="!foundLecture">
          <el-col :xs="24" style="text-align: center;">
            <h2 style="margin: 2em auto">ไม่พบโน้ตเลคเชอร์ที่ต้องการ</h2>
            <img src="/img/undraw_empty_xct9.svg" alt="not found" class="lecture-not-found">
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="foundLecture">
          <el-col :xs="24" :md="17">
            <object :data="pdfUrl" type="application/pdf" class="pdf-viewer"></object>
          </el-col>
          <el-col :xs="24" :md="7">
            <el-card class="note-meta-card">
              <h1>{{ lectureNote.title }}</h1>
              <div v-if="lectureNote.categories.length > 0">
                <ul v-if="lectureNote.categories.length > 1">
                  <li v-for="c in lectureNote.categories" :key="c.value">{{ c.englishName }}</li>
                </ul>
                <div v-else>{{ lectureNote.categories[0].englishName }}</div>
              </div>
              <DateText :dateObj="lectureNote.updatedAt"/>
              <UserChip :user="lectureNote.author" />
              <QualityThumbs :voteUp="lectureNote.voteUp"
                              :voteDown="lectureNote.voteDown"
                              :lectureId="lectureNote.objectId"
                              :chosen="chosenVote"
                              v-if="isLoggedIn" />
              <el-tooltip effect="dark"
                          :content="isFaved ? 'ลบจากคอลเลกชัน' : 'เก็บในคอลเลกชัน'"
                          placement="bottom-end"
                          v-if="isLoggedIn">
                <span class="favourite-btn" @click="toggleFav(lectureNote.objectId)">
                  <span class="material-icons">{{ isFaved ? 'star' : 'star_border' }}</span>
                </span>
              </el-tooltip>
              <hr>
              <div v-show="supportShare">
                <el-button type="text" style="font-size: 1em" @click="share">
                  <span class="material-icons">share</span>
                  แชร์
                </el-button>
              </div>
              <div v-if="isLoggedIn && lectureNote.author.id === userId">
                <el-button type="text" style="font-size: 1em" @click="edit">
                  <span class="material-icons">edit</span>
                  แก้ไข
                </el-button>
              </div>
              <div>
                <el-button type="text" style="font-size: 1em" @click="reportDialogVisible = true">
                  <span class="material-icons">report</span>
                  รายงานเนื้อหาไม่เหมาะสม
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog :visible.sync="reportDialogVisible" title="รายงานความไม่เหมาะสม" id="report-dialog">
      <el-form>
        <el-form-item label="เลือกเหตุผล">
          <el-select v-model="reportReason" style="width: 100%;">
            <el-option
                v-for="item in reportOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reportDialogVisible = false">ยกเลิก</el-button>
        <el-button type="primary" @click="submitReport">ส่ง</el-button>
      </span>
    </el-dialog>
  </BoxedContainer>
</template>

<style lang="sass">
.note-meta-card
  position: relative
  h1
    font-size: 1em
    margin-bottom: 0.3rem
  h2
    font-size: 1em
    font-weight: normal
    margin-bottom: 0.6rem
  .date-text
    margin-bottom: 0.8rem
  .favourite-btn
    font-size: 1.6em
    position: absolute
    right: 0.7em
    top: 0.7em
    cursor: pointer
  hr
    border: 0
    height: 0
    border-top: 1px solid rgba(0, 0, 0, 0.1)
    border-bottom: 1px solid rgba(255, 255, 255, 0.3)
    margin: 1em 0
.pdf-viewer
  width: 100%
  height: 70vh
#report-dialog
  .el-dialog__body
    padding-top: 15px
</style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';
import UserChip from '@/components/UserChip.vue';
import DateText from '@/components/DateText.vue';
import QualityThumbs from '@/components/QualityThumbs.vue';
import store from '@/store';
import ph from '@/helpers/parseHelper';
import ut from '@/helpers/util';

const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

export default {
  name: 'lectureNote',
  components: {
    BoxedContainer,
    UserChip,
    DateText,
    QualityThumbs,
  },
  data() {
    return {
      reportDialogVisible: false,
      lectureNote: {},
      loading: true,
      foundLecture: false,
      isFaved: false,
      chosenVote: '',
      userId: Parse.User.current() ? Parse.User.current().id : null,
      reportReason: '',
      reportOptions: [
        { value: '1', label: 'เนื้อหาเก่า' }, { value: '2', label: 'เนื้อหาผิด' }, { value: '3', label: 'ไม่ใช่สรุปบทเรียน' },
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn;
    },
    pdfUrl() {
      return `${store.state.endpoints.objectStorage}/${this.lectureNote.filePath}`;
    },
    supportShare() {
      if (navigator.share) return true;
      return false;
    },
  },
  methods: {
    getLectureNote(noteId) {
      ph.getLectureNote(noteId).then((result) => {
        if (result) {
          const lectureAttrs = ['id', 'author', 'categories', 'filePath', 'title',
            'updatedAt', 'voteDown', 'voteUp', 'upVoters', 'downVoters'];
          const authorAttrs = ['username', 'avatarPath'];
          const catAttrs = ['objectId', 'englishName'];
          this.lectureNote = ut.getObjWithAttrs(result, lectureAttrs);
          this.lectureNote.author = ut.getObjWithAttrs(result.get('author'), authorAttrs);
          this.lectureNote.categories = [];

          if (result.get('categories') !== undefined) {
            result.get('categories')
              .forEach((c) => {
                const tempCat = ut.getObjWithAttrs(c, catAttrs);
                this.lectureNote.categories.push(tempCat);
              });
          }

          // Sanitize
          if (this.lectureNote.upVoters === undefined) { this.lectureNote.upVoters = []; }
          if (this.lectureNote.downVoters === undefined) { this.lectureNote.downVoters = []; }

          if (this.userId) {
            ph.isRemotelyFaved(this.$route.params.noteId, this.userId)
              .then((favStatus) => {
                this.isFaved = favStatus;
                this.foundLecture = true;
                this.loading = false;
              })
              .catch((err) => { console.log(err); });
            this.chosenVote =
              ut.findMyVote(this.lectureNote.upVoters, this.lectureNote.downVoters, this.userId);
          } else {
            this.foundLecture = true;
            this.loading = false;
          }
        } else {
          this.foundLecture = false;
          this.loading = false;
        }
      }); // TODO: Add catch
    },
    toggleFav(noteId) {
      const LectureNote = Parse.Object.extend('LectureNote');
      const lecture = new LectureNote().set('id', noteId);
      if (this.isFaved) Parse.User.current().remove('favedNotes', lecture);
      else Parse.User.current().add('favedNotes', lecture);
      Parse.User.current().save()
        .then(() => {
          this.isFaved = !this.isFaved;
          return true;
        })
        .catch((e) => {
          this.$alert(e.message, 'เกิดข้อผิดพลาด', { confirmButtonText: 'OK' });
          return false;
        });
    },
    edit() {
      if (this.isLoggedIn && this.userId === this.lectureNote.author.id) {
        this.$router.push(`/note/${this.lectureNote.objectId}/edit/`);
      }
    },
    share() {
      navigator.share({
        title: this.lectureNote.title,
        url: this.$router.currentRoute.fullPath,
      });
    },
    submitReport() {
      ph.submitLectureReport(this.lectureNote.objectId, this.reportReason)
        .then(() => {
          this.$message({
            message: 'ส่งรายงานเรียบร้อย',
            type: 'success',
          });
          this.reportDialogVisible = false;
        }).catch((err) => {
          this.$message.error({
            message: err.message,
          });
        });
    },
  },
  created() {
    this.getLectureNote(this.$route.params.noteId);
  },
};
</script>

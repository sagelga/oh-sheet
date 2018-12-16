<template>
  <BoxedContainer class="top-gap bottom-gap">
    <div class="side-margin">
      <h1>จัดการรายงานเนื้อหา</h1>
      <p>รายการโน้ตเลคเชอร์ที่ได้รับรายงานความไม่เหมาะสม</p>
      <el-table :data="tableData" style="margin-top: 3.5em" v-loading="loading">
        <el-table-column prop="lectureNote.title" label="โน้ตเลคเชอร์"></el-table-column>
        <el-table-column prop="reason" label="สาเหตุ"></el-table-column>
        <el-table-column fixed="right" label="ตัวเลือก" width="130">
          <template slot-scope="scope">
            <el-tooltip content="ตรวจสอบ" placement="bottom-end">
              <el-button @click="view(scope.$index)" circle icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip content="ลบรายงาน" placement="bottom">
              <el-button @click="deleteReport(scope.$index)" circle
                         icon="el-icon-delete"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </BoxedContainer>
</template>

<style scoped>
</style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';
import ph from '@/helpers/parseHelper';
import ut from '@/helpers/util';
import store from '@/store';

const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

const LectureReport = Parse.Object.extend('LectureReport');

export default {
  name: 'ReportList',
  components: { BoxedContainer },
  data() {
    return {
      tableData: [],
      loading: true,
    };
  },
  methods: {
    view(index) {
      const noteId = this.tableData[index].lectureNote.objectId;
      this.$router.push(`/note/${noteId}/`);
    },
    deleteReport(index) {
      const reportId = this.tableData[index].objectId;
      const report = new LectureReport().set('id', reportId);
      report.destroy().then(() => {
        this.tableData.splice(index);
        this.$message({
          type: 'success',
          message: 'ลบรายงานเรียบร้อย',
        });
      }).catch((err) => {
        this.$message.error(err.message);
      });
    },
    async getReports() {
      ph.getLectureReports().then((reports) => {
        const reportAttr = ['id', 'reason', 'lectureNote'];
        const lecAttr = ['id', 'title'];
        let hasDeletedReport = false;
        reports.forEach((r) => {
          if (r.get('lectureNote') !== undefined) {
            const temp = ut.getObjWithAttrs(r, reportAttr);
            temp.lectureNote = ut.getObjWithAttrs(temp.lectureNote, lecAttr);
            this.tableData.push(temp);
          } else {
            r.destroy(() => { hasDeletedReport = true; });
          }
        });
        if (hasDeletedReport) this.getReports();
        else this.loading = false;
      });
    },
  },
  created() {
    this.getReports();
    document.title = 'Reports | Oh Sheet!';
    this.$parent.$refs.topNav.$refs.topNavMenu.activeIndex = '/manage-reports/';
  },
  beforeRouteEnter(to, from, next) {
    // when user directly enters this route, roles.mod will be undefined
    // which means the first 'if' is true
    if (store.state.roles.mod !== true) {
      if (Parse.User.current()) {
        ph.isUserInRole(Parse.User.current().id, 'moderator')
          .then(() => {
            store.commit('updateRoleMod', true);
            next();
          })
          .catch(() => { next({ path: '/not-found/' }); });
      } else { next({ path: '/login', query: { redirect: to.fullPath } }); }
    } else { next(); }
  },
};
</script>

<template>
  <BoxedContainer class="top-gap bottom-gap">
    <div class="side-margin">
      <h1>จัดการรายงานเนื้อหา</h1>
      <p>รายการโน้ตเลคเชอร์ที่ได้รับรายงานความไม่เหมาะสม</p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="lectureNote.title" label="โน้ตเลคเชอร์"></el-table-column>
        <el-table-column prop="reason" label="สาเหตุ"></el-table-column>
        <el-table-column fixed="right" label="ตัวเลือก" width="130">
          <template slot-scope="scope">
            <el-tooltip content="ตรวจสอบ" placement="bottom-end">
              <el-button @click="view(scope.$index)" circle icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip content="ลบรายงาน" placement="bottom">
              <el-button circle icon="el-icon-delete"></el-button>
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

export default {
  name: 'ReportList',
  components: { BoxedContainer },
  data() {
    return {
      tableData: [
        { lectureNote: { title: 'lel 1', objectId: 'a2xKluB' }, reason: 'เนื้อหาเก่า' },
        { lectureNote: { title: 'lel 2', objectId: '9dLfocs' }, reason: 'เนื้อหาเก่า' },
        { lectureNote: { title: 'lel 3', objectId: 'vmS8fmv' }, reason: 'เนื้อหาเก่า' },
      ],
    };
  },
  methods: {
    view(index) {
      const noteId = this.tableData[index].lectureNote.objectId;
      this.$router.push(`/note/${noteId}/`);
    },
  },
};
</script>

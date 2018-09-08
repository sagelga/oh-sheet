<template>
  <BoxedContainer>
    <el-menu :default-active="defaultActive" mode="horizontal"
      router="true" style="text-align: right;">
      <el-menu-item index="/">ค้นหา</el-menu-item>
      <el-menu-item index="/saved">คอลเลคชัน</el-menu-item>
      <el-menu-item index="/upload">อัปโหลด</el-menu-item>
      <el-submenu>
        <template slot="title">โปรไฟล์</template>
        <el-menu-item index="/profile/zartre">โปรไฟล์ของฉัน</el-menu-item>
        <el-menu-item index="/logout">ออกจากระบบ</el-menu-item>
      </el-submenu>
    </el-menu>
  </BoxedContainer>
</template>

<style>
  .el-menu--horizontal > .el-menu-item,
  .el-menu--horizontal > .el-submenu {
    float: none;
    display: inline-block;
  }
</style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';

export default {
  name: 'TopNav',
  components: {
    BoxedContainer,
  },
  data() {
    return {
      defaultActive: '/',
    };
  },
};
</script>

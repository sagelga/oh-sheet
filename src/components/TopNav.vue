<template>
  <BoxedContainer>
    <el-menu :default-active="defaultActive" mode="horizontal"
      :router="true" style="text-align: right;">
      <el-menu-item index="/">
        <i class="el-icon-search"></i>
      </el-menu-item>
      <el-menu-item index="/saved">
        <i class="el-icon-star-on"></i>
      </el-menu-item>
      <el-menu-item index="/upload">
        <i class="el-icon-upload"></i>
      </el-menu-item>
      <el-submenu id="topnav-more" index="#">
        <template slot="title"><i class="el-icon-setting"></i></template>
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
  .el-menu--horizontal > .el-submenu#topnav-more i.el-submenu__icon-arrow {
    display: none;
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

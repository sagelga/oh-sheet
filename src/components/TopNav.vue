<template>
  <BoxedContainer>
    <vs-topbar vs-color="primary">
      <h4>Oh, Sheet!</h4>
      <vs-button
        vs-color-text="#fff"
        vs-color="rgba(255, 255, 255, 0.3)"
        vs-type="flat"
        vs-icon="search"
        style="margin-left: auto;">
      </vs-button>
      <vs-button
        vs-color-text="#fff"
        vs-color="rgba(255, 255, 255, 0.3)"
        vs-type="flat"
        vs-icon="collections_bookmark">
      </vs-button>
      <vs-button
        vs-color-text="#fff"
        vs-color="rgba(255, 255, 255, 0.3)"
        vs-type="flat"
        vs-icon="cloud_upload">
      </vs-button>
      <vs-dropdown>
          <i class="material-icons" style="color: #fff">more_vert</i>
        <vs-dropdown-menu>
          <vs-dropdown-item>ข้อมูลส่วนตัว</vs-dropdown-item>
          <vs-dropdown-item>โน้ตเลคเชอร์ของฉัน</vs-dropdown-item>
          <vs-dropdown-item>ออกจากระบบ</vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </vs-topbar>
  </BoxedContainer>
</template>

<style>
  .vs-topbar {
    padding: 0.4em 0.8em;
  }
  .vs-con-dropdown i.material-icons {
    font-size: 1em;
    padding: 9px;
  }
</style>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';

export default {
  name: 'TopNav',
  components: {
    BoxedContainer,
  },
};
</script>

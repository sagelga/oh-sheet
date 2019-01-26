<template>
  <BoxedContainer class="top-gap bottom-gap make-footer-sticky">
    <div class="side-margin">
      <h1>Error</h1>
      <h2>ไม่พบหน้าดังกล่าว หรือคุณไม่มีสิทธิ์เข้าถึงหน้านี้</h2>
      <img src="/img/undraw_forgot_password_gi2d.svg" alt="not found" class="lecture-not-found">
    </div>
  </BoxedContainer>
</template>

<script>
import BoxedContainer from '@/components/BoxedContainer.vue';

export default {
  name: 'NotFound',
  components: { BoxedContainer },
  mounted() {
    document.title = 'Not Found | Oh Sheet!';
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
h2 {
  max-width: 300px;
  text-align: center;
  margin: 2em auto;
}
</style>

<template>
    <div class="body">
      <img src="/img/Oh_sheet_logo_for_footer_crop.JPG" class="logo" align="top">
      <a href="www.google.com" class="link"><p>ไปเยอรมัน</p></a>
      <p1>"เห็นเธอที่เยอรมัน"</p1>
    </div>
</template>

<style scoped>
  .logo {
    height: 50px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 0;
  }
  .body {
    background-color: #3c3c3c;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
  a:link {
    color: white;
    background-color: transparent;
  }
  p, p1 {
    color: #FFFFFF;
    margin-top:0;
    margin-bottom: 0;
    font-size: 16;
  }
</style>
<script>
import BoxedContainer from '@/components/BoxedContainer.vue';

export default {
  name: 'Footer',
  components: {
    BoxedContainer,
  },
};
</script>

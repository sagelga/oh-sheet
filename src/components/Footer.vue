<template>
    <div class="body">
      <img src="/img/Oh_sheet_logo_for_footer_crop.JPG" class="logo" align="top">
      <a href="www.google.com" class="link"><h3>ไปเยอรมัน</h3></a>
      <h1>"เห็นเธอที่เยอรมัน"</h1>
    </div>
</template>

<style>
  .logo {
    height: 50px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 0;
  }
  .container {
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
  h1, h3 {
    color: #FFFFFF;
    margin-top:0;
    margin-bottom: 0;
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

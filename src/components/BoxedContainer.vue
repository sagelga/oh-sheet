<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style>
  .container {
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<script>
export default {
  name: 'BoxedContainer',
};
</script>

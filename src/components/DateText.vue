<template>
  <div class="date-text">
    {{ dateObj.getDate() }} {{ month }} {{ dateObj.getFullYear() }}
  </div>
</template>

<style></style>

<script>
const monthsTH = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

export default {
  name: 'DateText',
  props: {
    dateObj: Date,
  },
  data() {
    return {
      date: '',
      month: '',
      year: '',
    };
  },
  mounted() {
    this.month = monthsTH[this.dateObj.getMonth()];
  },
};
</script>

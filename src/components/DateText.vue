<template>
  <div class="date-text">
    {{ dateStr }} {{ monthStr }} {{ yearStr }}
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
      monthsTH: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
      date: '',
      month: '',
      year: '',
    };
  },
  watch: {
    dateObj() {
      this.date = this.dateObj.getDate();
      this.month = monthsTH[this.dateObj.getMonth()];
      this.year = this.dateObj.getFullYear();
    },
  },
  computed: {
    dateStr() {
      return this.date || this.dateObj.getDate();
    },
    monthStr() {
      return this.month || monthsTH[this.dateObj.getMonth()];
    },
    yearStr() {
      return this.year || this.dateObj.getFullYear();
    },
  },
};
</script>

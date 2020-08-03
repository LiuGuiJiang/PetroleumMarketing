<template>
    <div class="time">{{date | formatDateTime}}</div>
</template>

<script>
export default {
  name: 'test',
  data: function() {
    return {
      date: new Date(),
    };
  },
  created() {
  },
  mounted() {
    let _this = this;
    this.timer = setInterval(function() {
      _this.date = new Date();
    });
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
   
  },
  filters: {
    //日期时间格式化
    formatDateTime (dateObj) {
      return dateObj.getFullYear() + '-' +
        (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-' +
        ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate()) + ' ' +
        ((dateObj.getHours() > 9) ? dateObj.getHours() : '0' + dateObj.getHours()) + ':' +
        ((dateObj.getMinutes() > 9) ? dateObj.getMinutes() : '0' + dateObj.getMinutes()) + ':' +
        ((dateObj.getSeconds() > 9) ? dateObj.getSeconds() : '0' + dateObj.getSeconds());
    }
  }
};
</script>

<style>
</style>

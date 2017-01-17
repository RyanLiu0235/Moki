<template>
  <div>
  	<div class="loading" v-show="!isDataLoaded">加载中...</div>
    <div class="w-list" v-show="isDataLoaded">
      <div v-for="w in dailyForecast" class="w-item">
        <div class="i-day">{{ w.date | getDay }}</div>
        <div class="i-date">{{ w.date | getDate }}</div>
        <div class="i-cond">
          <div class="i-w-item w-d">
            <div>白天</div>
            <div>{{ w.cond.txt_d }}</div>
          </div>
          <div class="i-w-item w-n">
            <div>晚上</div>
            <div>{{ w.cond.txt_n }}</div>
          </div>
        </div>
        <div class="i-tmp">
          <div>{{ w.tmp.min }}℃ ~ {{ w.tmp.max }}℃</div>
        </div>
        <div class="i-wind">
          <div>{{ w.wind.dir }} {{ w.wind.sc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex';

export default {
  name: 'listPage',
  computed: {
  	...mapGetters(['dailyForecast', 'isDataLoaded'])
  }
}
</script>
<style lang="less">
.w-list {
  display: flex;
  text-align: center;
  .w-item {
    flex: 1;
  }
  .i-cond {
    display: flex;
    .i-w-item {
      flex: 1;
    }
  }
}
</style>

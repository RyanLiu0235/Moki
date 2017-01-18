<template>
  <div class="moki-weather">
    <div class="moki-weather-loading" v-show="!isWeatherLoaded">加载中...</div>
    <div class="moki-weather-wrapper" v-show="isWeatherLoaded">
      <el-row type="flex" align="middle" class="moki-weather-nav">
        <el-col :span="8" v-for="(w, index) in dailyForecast" :class="{'active': index === cur}" class="moki-weather-nav-item">
          <div :data-index="index" @click="changeDay(index)">{{ w.date | getDay }}</div>
        </el-col>
      </el-row>
      <transition-group class="moki-weather-list" name="list">
        <div v-for="(w, index) in dailyForecast" v-show="cur === index" :key="w" class="moki-weather-list-item">
          <el-row type="flex" justify="center" class="i-cond">
            <el-col :span="6" class="i-cond-item cond-d">
              <div>白天</div>
              <div>{{ w.cond.txt_d }}</div>
            </el-col>
            <el-col :span="6" class="i-cond-item cond-n">
              <div>晚上</div>
              <div>{{ w.cond.txt_n }}</div>
            </el-col>
          </el-row>
          <div class="i-date">{{ w.date | getDate }}</div>
          <div class="i-tmp">
            <div>{{ w.tmp.min }}℃ ~ {{ w.tmp.max }}℃</div>
          </div>
          <div class="i-wind">
            <div>{{ w.wind.dir }} {{ w.wind.sc }}</div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex';

export default {
  name: 'listPage',
  data() {
    return {
      cur: 0 // 0 | 1 | 2 currently activated day
    }
  },
  computed: {
    ...mapGetters(['dailyForecast', 'isWeatherLoaded'])
  },
  methods: {
    changeDay(index) {
      this.cur = index;
    }
  }
}
</script>
<style lang="less">
.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.moki-weather {
  &-nav {
    height: 50px;
    background-color: #fff;
    &-item {
      position: relative;
      line-height: 50px;
      text-align: center;
      &.active {
        &:after {
          content: '';
          position: absolute;
          bottom: -13px;
          left: 50%;
          width: 16px;
          height: 16px;
          background-color: #fff;
          transform: rotate(45deg) translateX(-50%);
        }
      }
    }
  }
  &-list {
    position: relative;
    display: block;
    height: 300px;
    &-item {
      position: absolute;
      top: 0;
      left: 0;
      height: 300px;
      width: 100%;
      padding: 20px 0;
      text-align: center;
    }
  }
}
</style>

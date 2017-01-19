<template>
  <div class="moki-weather" :class="DoN">
    <div class="moki-weather-loading" v-show="!isWeatherLoaded">加载中...</div>
    <div class="moki-weather-wrapper" v-show="isWeatherLoaded">
      <el-row type="flex" align="middle" class="moki-weather-nav">
        <el-col :span="8" v-for="(w, index) in dailyForecast" :class="{'active': index === cur}" class="moki-weather-nav-item">
          <div @click="changeDay(index)">{{ w.date | getDay }}</div>
        </el-col>
      </el-row>
      <transition-group class="moki-weather-list" name="list">
        <div v-for="(w, index) in dailyForecast" v-show="cur === index" :key="w" class="moki-weather-list-item">
          <div class="i-date">{{ w.date | getDate }}</div>
          <div class="i-cond">
            <span class="i-cond-item cond-d">{{ w.cond.txt_d }}</span>
             ~ 
            <span class="i-cond-item cond-n">{{ w.cond.txt_n }}</span>
          </div>
          <div class="i-tmp i-meta">
            <div>温度范围：{{ w.tmp.min }}℃ ~ {{ w.tmp.max }}℃</div>
          </div>
          <div class="i-wind i-meta">
            <div>风力风向：{{ w.wind.dir }} {{ w.wind.sc }}</div>
          </div>
          <div class="i-meta i-hum">
            <div>相对湿度：{{ w.hum }}%</div>
          </div>
          <div class="i-meta i-astro">
            <div>日升日落：{{ w.astro.sr }} ~ {{ w.astro.ss }}</div>
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
    ...mapGetters(['dailyForecast', 'isWeatherLoaded']),
    isNight() {
      let _now = new Date(),
        _hour = _now.getHours(),
        _minute = _now.getMinutes(),
        sr = this.dailyForecast[0].astro.sr,
        ss = this.dailyForecast[0].astro.ss,
        _srHour = sr ? sr.split(':')[0] : 7,
        _srMinute = sr ? sr.split(':')[1] : 0,
        _ssHour = ss ? ss.split(':')[0] : 19,
        _ssMinute = ss ? ss.split(':')[1] : 0;

      return _hour < _srHour ||
        _hour == _srHour && _minute < _srMinute ||
        _hour == _ssHour && _minute > _ssMinute ||
        _hour > _ssHour;
    },
    DoN() {
      return this.isNight ? 'night-time' : 'day-time';
    }
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
  height: 100%;
  &.day-time {
    background-color: #58B2DC;
    color: #1F2D3D;
    .moki-weather-nav {
      background-color: #EFF2F7;
      &-item {
        &.active {
          color: #58B2DC;
          &:after {
            background-color: #EFF2F7;
          }
        }
      }
    }
    .i-cond-item {
      &.cond-d {
        color: #fff;
        font-size: 28px;
      }
    }
  }
  &.night-time {
    background-color: #324057;
    color: #F9FAFC;
    .moki-weather-nav {
      background-color: #8492A6;
      &-item {
        &.active {
          color: #324057;
          &:after {
            background-color: #8492A6;
          }
        }
      }
    }
    .i-cond-item {
      &.cond-n {
        color: #fff;
        font-size: 28px;
      }
    }
  }
  &-wrapper {
    height: 100%;
  }
  &-nav {
    height: 50px;
    &-item {
      position: relative;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      transition: all ease .3s;
      &.active {
        font-size: 18px;
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
    height: 100%;
    &-item {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    .i-date {
      position: absolute;
      top: 40px;
      left: 20px;
      color: #fff;
    }
    .i-cond {
      position: absolute;
      width: 100%;
      top: 100px;
      color: #fff;
      text-align: center;
      &-item {
        font-size: 20px;
        text-align: center;
      }
    }
    .i-meta {
      position: absolute;
      left: 60px;
      width: 200px;
      font-size: 12px;
      color: #fff;
    }
    .i-tmp {
      top: 185px;
    }
    .i-wind {
      top: 215px;
    }
    .i-hum {
      top: 245px;
    }
    .i-astro {
      top: 275px;
    }
  }
}
</style>

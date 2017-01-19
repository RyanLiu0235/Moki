<template>
  <div class="moki-container">
    <list></list>
    <el-row class="moki-footer">
      <el-col :span="14" class="moki-footer-meta">
        <span>{{ date }}</span>
        <span>{{ basicInfo.city }} {{ basicInfo.cnty }}</span>
      </el-col>
      <el-col :span="10" class="moki-footer-update">更新时间：{{ basicInfo.update.loc | getTime }}</el-col>
    </el-row>
  </div>
</template>
<script>
import list from './list';
import {
  mapActions,
  mapGetters
} from 'vuex';

import {
  ipcRenderer
} from 'electron';

export default {
  name: 'indexPage',
  data() {
    return {
      date: new Date().toLocaleTimeString()
    }
  },
  mounted() {
    this.$store.dispatch('fetchWeather', 'shanghai');
    setInterval(() => {
      this.date = new Date().toLocaleTimeString();
    }, 1000);
    ipcRenderer.on('change-city', (e, city) => {
      this.$store.dispatch('fetchWeather', city);
    });
  },
  components: {
    list
  },
  methods: {
    ...mapActions(['fetchWeather', 'fetchCity']),
    refresh() {
      this.$store.dispatch('fetchWeather', 'shanghai');
    }
  },
  computed: {
    ...mapGetters(['basicInfo'])
  }
}
</script>
<style lang="less">
.moki {
  &-container {
    position: relative;
    height: 100%;
  }
  &-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 5px;
    font-size: 12px;
    color: #fff;
    &-update {
      text-align: right;
    }
  }
}
</style>

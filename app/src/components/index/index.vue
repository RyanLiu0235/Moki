<template>
  <div class="moki-container">
    <div class="moki-content">
      <list></list>
    </div>
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
    }
    &-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      &-update {
        text-align: right;
      }
    }
  }
</style>

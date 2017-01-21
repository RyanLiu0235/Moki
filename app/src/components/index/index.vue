<template>
  <div class="moki-index">
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

import * as _ from '../../utils';

export default {
  name: 'indexPage',
  data() {
    return {
      date: new Date().toLocaleTimeString(),
      city: ''
    }
  },
  mounted() {
    let _city = this.$route.params.city;
    // if no city then check localStorage for the checked option
    if (!_city) {
      _city = _.findCheckedCity(HEkey).name;
    }
    this.city = _city;
    this.$store.dispatch('fetchWeather', _city);

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
      this.$store.dispatch('fetchWeather', this.city);
    }
  },
  computed: {
    ...mapGetters(['basicInfo'])
  }
}
</script>
<style lang="less">
.moki {
  &-index {
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
    padding: 0 20px;
    font-size: 12px;
    color: #fff;
    &-update {
      text-align: right;
    }
  }
}
</style>

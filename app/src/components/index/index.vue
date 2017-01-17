<template>
  <div class="moki-container">
    <div class="moki-header">
      <span>{{ date }}</span>
      <span>{{ basicInfo.city }} {{ basicInfo.cnty }}</span>
      <span>更新时间：{{ basicInfo.update.loc | getTime }}</span>
      <span @click="refresh">刷新</span>
    </div>
    <div class="moki-content">
      <list></list>
    </div>
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
    this.$store.dispatch('fetchWeather');
    setInterval(() => {
      this.date = new Date().toLocaleTimeString();
    }, 1000);
  },
  components: {
    list
  },
  methods: {
    ...mapActions(['fetchWeather']),
    refresh() {
    	this.$store.dispatch('fetchWeather');
    }
  },
  computed: {
    ...mapGetters(['basicInfo'])
  }
}
</script>

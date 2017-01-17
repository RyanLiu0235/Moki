<template>
  <div class="moki-container">
    <div class="moki-header">
      <span>{{ date }}</span>
      <span>{{ basicInfo.city }} {{ basicInfo.cnty }}</span>
    </div>
    <div class="moki-content">
      <list></list>
    </div>
    <div class="moki-footer">
      <span>更新时间：{{ basicInfo.update.loc | getTime }}</span>
      <!-- <span @click="refresh">刷新</span> -->
    	<!-- <router-link :to="{name: 'city-page'}">更换城市</router-link> -->
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

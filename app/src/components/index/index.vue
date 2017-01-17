<template>
  <div class="moki-container">
    <div class="wrapper">
      <div class="moki-header">
        <span>{{ date }}</span>
        <span>{{ basicInfo.city }} {{ basicInfo.cnty }}</span>
      </div>
      <div class="moki-content">
        <list></list>
      </div>
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
    ...mapActions(['fetchWeather'])
  },
  computed: {
    ...mapGetters(['basicInfo'])
  }
}
</script>

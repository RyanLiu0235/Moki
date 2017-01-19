<template>
  <div class="moki">
    <router-view></router-view>
  </div>
</template>
<script>
import store from 'src/vuex/store';
import 'normalize.css';

import {
  ipcRenderer
} from 'electron';

export default {
  store,
  mounted() {
    // subscribe 'change-city' event
    ipcRenderer.on('change-city', (e, city) => {
      this.$store.dispatch('fetchWeather', city);
    });
    // subscribe 'go-to' event
    ipcRenderer.on('go-to', (e, page) => {
    	this.$router.push({
    		name: page
    	});
    });
  }
}
</script>
<style lang="less">
html, body, .moki {
	height: 100%;
}
body {
	font-family: Hiragino Sans GB;
	font-size: 14px;
}
</style>

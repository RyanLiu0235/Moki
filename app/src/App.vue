<template>
  <div class="moki">
    <router-view></router-view>
  </div>
</template>
<script>
import store from 'src/vuex/store';
import 'normalize.css';
import { mapActions } from 'vuex';

import {
  ipcRenderer
} from 'electron';

export default {
  store,
  mounted() {
    // subscribe 'change-city' event
    ipcRenderer.on('change-city', (e, city) => {
      let curPage = this.$route.name;
      if (curPage === 'index-page') {
        this.$store.dispatch('fetchWeather', city);
      } else {
        this.$router.push({
          name: 'index-page',
          params: {
            city: city
          }
        });
      }
    });
    // subscribe 'go-to' event
    ipcRenderer.on('go-to', (e, page) => {
      this.$router.push({
        name: page
      });
    });
  },
  methods: {
    ...mapActions(['fetchWeather'])
  }
}
</script>
<style lang="less">
html,
body,
.moki {
  height: 100%;
}

body {
  font-family: Hiragino Sans GB;
  font-size: 14px;
  -webkit-user-select: none;
}
</style>

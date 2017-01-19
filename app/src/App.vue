<template>
  <div class="moki">
    <router-view></router-view>
  </div>
</template>
<script>
import store from 'src/vuex/store';
import 'normalize.css';

export default {
  store
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

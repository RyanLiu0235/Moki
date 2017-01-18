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
body {
  background-color: #58B2DC;
}
</style>

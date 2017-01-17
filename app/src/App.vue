<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'src/vuex/store'
  import 'normalize.css';
  
  export default {
    store
  }
</script>

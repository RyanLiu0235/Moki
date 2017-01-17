<template>
  <div class="moki-container">
    <div class="wrapper">
      <div class="moki-header">
        <span>{{ date }}</span>
        <span>{{ location }}</span>
      </div>
      <div class="moki-content">
        <list></list>
      </div>
    </div>
  </div>
</template>
<script>
import list from './list';

export default {
  name: 'indexPage',
  data() {
    return {
      date: new Date().toDateString(),
      location: '上海市'
    }
  },
  components: {
    list
  }
}
</script>

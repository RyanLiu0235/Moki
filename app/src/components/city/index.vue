<template>
  <div>
    <div class="moki-city-header">
      <div class="city-selec">
        <input type="search" v-model="cityS" placeholder="beijing/北京" @keyup.enter="doSearch" />
      </div>
    </div>
    <div class="moki-city-content" v-show="!isCityLoaded">
    	<div class="moki-city-search-result">{{ cityInfo.city }}</div>
    </div>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex';

export default {
  name: 'cityPage',
  data() {
    return {
      cityS: ''
    }
  },
  methods: {
  	...mapActions(['fetchCity']),
    doSearch() {
      console.log(this.cityS);
      this.$store.dispatch('fetchCity', this.cityS);
    }
  },
  computed: {
  	...mapGetters(['cityInfo', 'isCityLoaded'])
  }
}
</script>

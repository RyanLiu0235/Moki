<template>
  <div class="moki-city">
    <div class="moki-city-search">
      <el-input v-model="citySearch" placeholder="请输入内容" icon="search" :on-icon-click="doSearch"></el-input>
      <router-link :to="{ name: 'index-page', params: { city: cityInfo.city }}" class="moki-city-result">{{ isCityLoaded ? `${cityInfo.city} - ${cityInfo.prov} - ${cityInfo.cnty}` : placeholder }}</router-link>
    </div>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex';

export default {
  name: 'settingPage',
  data() {
    return {
      citySearch: '',
      placeholder: ''
    };
  },
  computed: {
    ...mapGetters(['cityInfo', 'isCityLoaded'])
  },
  methods: {
    ...mapActions(['fetchCity']),
    doSearch() {
      this.$store.dispatch('fetchCity', this.citySearch);
      this.placeholder = '加载中...';
    },
    doChange() {}
  },
  mounted() {

  }
};
</script>
<style lang="less">
.moki-city {
  padding: 10px;
  &-result {
    display: block;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
}
</style>

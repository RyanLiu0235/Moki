<template>
  <div class="moki-login">
    <el-row :gutter="20" class="moki-login-form">
      <el-col :span="20">
        <el-input v-model="heKey" placeholder="请输入你的key"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="submit">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
const initCities = [{
  name: '上海',
  meta: {
    city: '上海',
    cnty: '中国',
    checked: true
  }
}, {
  name: '北京',
  meta: {
    city: '北京',
    cnty: '中国',
    checked: false
  }
}, {
  name: '深圳',
  meta: {
    city: '深圳',
    cnty: '中国',
    checked: false
  }
}, {
  name: '广州',
  meta: {
    city: '广州',
    cnty: '中国',
    checked: false
  }
}];
import {
  setLocalCache
} from '../../utils';

import { ipcRenderer } from 'electron';

// check if key is 32-bit hexadecimal number
function checkIfKeyIsValid(key) {
  return /[a-f0-9]{32}/gi.test(key);
}

export default {
  name: 'login-page',
  data() {
    return {
      heKey: ''
    }
  },
  methods: {
    submit() {
      if (checkIfKeyIsValid(this.heKey)) {
      	// if the key is valid, store the key and some initial cities
      	// informations in localStorage, pass key to a global scoped variable 
      	// HEkey and then redirect to index page
      	window.HEkey = this.heKey;
        setLocalCache('user', this.heKey);
        setLocalCache(`${HEkey}-cities`, initCities);

        // emit `update-city` event 
        ipcRenderer.send('update-city', initCities);
        this.$router.push({
          name: 'index-page',
          params: {
            city: '上海'
          }
        });
      }
    }
  }
}
</script>

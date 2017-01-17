<template>
  <div>
    <div class="w-list">
      <div v-for="w in weather" class="w-item">
        <div class="i-day">{{ w.date | getDay }}</div>
        <div class="i-date">{{ w.date | getDate }}</div>
        <div class="i-cond">
        	<div class="i-w-item w-d">
        		<div>白天</div>
        		<div>{{ w.cond.txt_d }}</div>
        	</div>
        	<div class="i-w-item w-n">
        		<div>晚上</div>
        		<div>{{ w.cond.txt_n }}</div>
        	</div>
        </div>
        <div class="i-tmp">
        	<div>{{ w.tmp.min }}℃ ~ {{ w.tmp.max }}℃</div>
        </div>
        <div class="i-wind">
        	<div>{{ w.wind.dir }} {{ w.wind.sc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'listPage',
  data() {
    return {
      weather: [{
        "astro": {
          "mr": "22:11",
          "ms": "10:01",
          "sr": "06:52",
          "ss": "17:15"
        },
        "cond": {
          "code_d": "104",
          "code_n": "305",
          "txt_d": "阴",
          "txt_n": "小雨"
        },
        "date": "2017-01-17",
        "hum": "73",
        "pcpn": "0.0",
        "pop": "0",
        "pres": "1029",
        "tmp": {
          "max": "11",
          "min": "7"
        },
        "uv": "4",
        "vis": "10",
        "wind": {
          "deg": "82",
          "dir": "东风",
          "sc": "微风",
          "spd": "7"
        }
      }, {
        "astro": {
          "mr": "23:06",
          "ms": "10:35",
          "sr": "06:52",
          "ss": "17:16"
        },
        "cond": {
          "code_d": "305",
          "code_n": "305",
          "txt_d": "小雨",
          "txt_n": "小雨"
        },
        "date": "2017-01-18",
        "hum": "88",
        "pcpn": "6.3",
        "pop": "100",
        "pres": "1028",
        "tmp": {
          "max": "9",
          "min": "7"
        },
        "uv": "1",
        "vis": "2",
        "wind": {
          "deg": "52",
          "dir": "东北风",
          "sc": "微风",
          "spd": "8"
        }
      }, {
        "astro": {
          "mr": "00:00",
          "ms": "11:09",
          "sr": "06:52",
          "ss": "17:17"
        },
        "cond": {
          "code_d": "305",
          "code_n": "101",
          "txt_d": "小雨",
          "txt_n": "多云"
        },
        "date": "2017-01-19",
        "hum": "83",
        "pcpn": "0.9",
        "pop": "100",
        "pres": "1027",
        "tmp": {
          "max": "9",
          "min": "0"
        },
        "uv": "1",
        "vis": "2",
        "wind": {
          "deg": "305",
          "dir": "北风",
          "sc": "微风",
          "spd": "10"
        }
      }]
    }
  }
}
</script>
<style lang="less">
	.w-list {
		display: flex;
		text-align: center;
		.w-item {
			flex: 1;
		}
		.i-cond {
			display: flex;
			.i-w-item {
				flex: 1;
			}
		}
	}
</style>
import Vue from 'vue';

/**
 * getDay
 * 
 * @param  {String} time  original Date string
 * @return {String} the day of the week 
 */
Vue.filter('getDay', function(time) {
  let _time = new Date(time).getDay(),
    day;
  switch (_time) {
    case 0:
      day = '星期日';
      break;
    case 1:
      day = '星期一';
      break;
    case 2:
      day = '星期二';
      break;
    case 3:
      day = '星期三';
      break;
    case 4:
      day = '星期四';
      break;
    case 5:
      day = '星期五';
      break;
    case 6:
      day = '星期六';
      break;
  }
  return day;
});

/**
 * getDate
 * 
 * @param  {String} time  original Date string
 * @return {String} MM月DD日
 */
Vue.filter('getDate', function(time) {
	let _time = new Date(time);
	return `${_time.getMonth() + 1}月${_time.getDate()}日`;
});

/**
 * getTime
 * 
 * @param  {String} time  original Date string
 * @return {String} 下午hh:mm:ss
 */
Vue.filter('getTime', function(time) {
  let _time = new Date(time);
  return `${_time.toLocaleTimeString()}`;
})
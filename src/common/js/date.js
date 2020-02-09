var utils = {
  // 利用正则
  formatDate (date, fmt) {
    // 匹配fmt中的年
    if (/(y+)/.test(fmt)) {
      // RegExp.$1 为匹配的年的字符串
      // substr 截取字符串
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        // 转为字符串
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
      }
    }
    return fmt;
  },
  // 当时间为单个数时拼接 0
  padLeftZero (str) {
    return ('00' + str).substr(str.length);
  }
// dateFormat (date, pattern) {
//     var dt = new Date(date);
//     var y = dt.getFullYear();
//     var m = dt.getMonth() + 1;
//     var d = dt.getDate();
//     if(pattern && pattern.toLowerCase()=== 'yyyy-mm-dd'){
//         return `${y}-${m}-${d}`;
//     }else{
//         var hh = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
//         var mm = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
//         var ss = dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds();
//         return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
//       }
//    }
};

export default utils;

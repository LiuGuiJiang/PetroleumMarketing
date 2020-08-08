// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

/**1.0 路由 */
import router from './router'

/**2.0 element-ui组件 v2.82 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';

/**3.0 Echarts画图*/
import echarts from 'echarts'
// import 'echarts/theme/mazarine.js'

/**4.0 引用阿里小图标,注意：暂时没有图标，引用会报错 */
import './assets/iconfont/iconfont.css'  
import './assets/font/iconfont.css'

/**5.0 axios异步请求 */
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
//5.1 引入接口
import api from '@/api'
//5.2 设置post请求头
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**6.0 vuex全局状态管理 */
import store from './store/store.js'

/**7.0 引入百度地图*/
import BaiduMap from 'vue-baidu-map'

/**高德地图引入 */
import AMap from 'vue-amap'

/**8.0 组件内部公共样式修改 */
import './assets/css/message.css'
import './assets/css/form.css'
import './assets/css/dialog.css'


/**9.0 全局方法、变量使用 */
//9.1 全局方法
import GlobalFunc from '@/utils/globalFunc.js'
//9.2 全局变量
import GlobalVar from '@/utils/globalVar.js'
//9.3公共组件封装s
import JTable from '@/components/Table/index'
import JPaging from '@/components/Paging/index'
import JFunctionMenu from '@/components/FunctionMenu/index'
//9.4 引入Dialog可拖拽及改变宽度
import './assets/js/directives.js';

import i18n from '@/i18n/i18n'

//10. WebSocket封装方法
import * as socketApi from '@/api/socket'

// dataV
import dataV from '@jiaminghi/data-view'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.axios = axios
Vue.prototype.qs = qs
Vue.prototype.GlobalFunc = GlobalFunc
Vue.prototype.GlobalVar = GlobalVar
Vue.prototype.socketApi = socketApi

Vue.use(ElementUI, { size: 'mini', zIndex: 2000 });
Vue.use(VueAxios,axios)
Vue.use(api)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'YOUR_APP_KEY'
})
// Vue.use(AMap)
// AMap.initAMapApliLoader({
//   key: '5f463ec108911f239e541aa2b7a57f8f',
//   plugin:['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   v: '1.4.4'
// })
Vue.use(dataV)

//20.0封装的全局公共组件
Vue.component('JTable',JTable)
Vue.component('JPaging',JPaging)
Vue.component('JFunctionMenu',JFunctionMenu)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})

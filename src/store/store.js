/**将管理状态全部由此导出 */
import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import app from './modules/app'
import menu from './modules/menu'
import wells from './modules/wells'
import socket from './modules/socket'

const store = new vuex.Store({
    modules: {
        app: app,
        menu: menu,
        wells: wells,
        socket: socket
    }
})

export default store
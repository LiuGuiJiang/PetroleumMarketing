export default {
    state: {
        isCollapse: false, //导航栏收缩状态
        isBigScreen: JSON.parse(window.sessionStorage.getItem('isBigScreen')) || false, //是否显示全屏
        isLoading: false, // 加载中。。。。
        chiefEditor: JSON.parse(window.sessionStorage.getItem('chiefEditor')) || null, //主菜单编号
        isSocket: false, //socket连接状态
        isAsideMenu: false //是否显示左侧菜单
    },
    getters: {
        isCollapse(state){ //对应上面的state
            return state.isCollapse
        },
        isBigScreen(state){
            return state.isBigScreen
        },
        isLoading(state){
            return state.isLoading
        },
        chiefEditor(state){
            return state.chiefEditor
        },
        isSocket(state){
            return state.isSocket
        },
        isAsideMenu(state){
            return state.isAsideMenu
        }
    },
    mutations: {
        onIsCollapse(state){ //改变收缩状态
            state.isCollapse = !state.isCollapse
        },
        onIsBigScreen(state,name){ //防止页面刷新状态丢失
            state.isBigScreen = name
            window.sessionStorage.setItem('isBigScreen', JSON.stringify(state.isBigScreen))
            //console.log(state.isBigScreen,JSON.parse(window.localStorage.getItem('isBigScreen')))
        },
        onIsLoading(state,name){ //改变加载状态
            state.isLoading = name
        },
        onChiefEditor(state,name){ //获取当前主编号
            state.chiefEditor = name
            window.sessionStorage.setItem('chiefEditor', JSON.stringify(state.chiefEditor))
        },
        onIsSocket(state,name){ //获取当前状态
            state.isSocket = name
        },
        onIsAsideMenu(state,name){
            state.isAsideMenu = name
        }
    }
}
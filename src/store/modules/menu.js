/**
 * 左侧导航二级菜单
 */
 export default {
    state: {
        leftMenuNav: [],  //大屏左侧导航菜单
        topMenuStatus: '' //大屏头部菜单状态
    },
    getters: {
        leftMenuNav(state){
            return state.leftMenuNav
        },
        topMenuStatus(state){
            return state.topMenuStatus
        }
    },
    mutations: {
        updateLeftMenuNav (state, name) {
            state.leftMenuNav = name
        },
        updateTopMenuStatus (state, name) {
            state.topMenuStatus = name
        }
    }
}
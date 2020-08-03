/**
 * 井的相关信息状态
 */
export default {
    state: {
        drillingCrew: "27", //井队
        isShowCrew: false // 是否显示井队
    },
    getters: {
        drillingCrew(state){
            return state.drillingCrew
        },
        isShowCrew (state) {
            return state.isShowCrew
        }
    },
    mutations: {
        updateDrillingCrew (state, name) {
            state.drillingCrew = name
        },
        onIsShowCrew (state, name) {
            state.isShowCrew = name
        }
    }
}
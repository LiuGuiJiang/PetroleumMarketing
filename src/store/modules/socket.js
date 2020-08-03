/**
 * socket实时数据
 */
export default {
    state: {
        socketData: {}
    },
    getters: {
        socketData(state){
            return state.socketData
        }
    },
    mutations: {
        updateSocketData (state, value) {
            state.socketData = value
        }
    }
}
import request from '../request'
/**
 * 用户登录接口管理
 */


 // 登录
export const login = (uName,password) => {
    return request({
        url: '/auth/login?account='+uName+'&password='+password,
        method: 'post',
    })
}

// 登出z
export const logout = () => {
    return request({
        url: 'logout',
        method: 'get'
    })
}

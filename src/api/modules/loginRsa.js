import request from '../request'
/**
 * 用户登录接口管理
 */


 // 登录
export const loginRsa = (uName,password) => {
    return request({
        url: '/auth/publicKey?account='+uName+'&password='+password,
        method: 'post',
    })
}

// 登出z
export const logoutRsa = () => {
    return request({
        url: 'logout',
        method: 'get'
    })
}

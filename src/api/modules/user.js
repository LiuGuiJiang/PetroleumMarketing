import request from '../request'
/**
 * 用户信息接口管理
 */

//查询



//添加/修改信息
export const register = (data) => {
    return request({
        url: '/auth/register',
        method: 'post',
        data
    })
}


//修改密码















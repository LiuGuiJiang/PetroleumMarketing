import request from '../request'
/**
 * 加油站信息接口
 */

 //1.查询加油站信息
export const selStationSite = (params) => {
    return request({
        url:"/gis/station/queryStationInfos",
        method: 'GET',
        params
    })
}


//2.添加加油站信息
export const saveStationSite = (data) => {
    return request({
        url:"gis/station/saveStation",
        method: 'post',
        data
    })
}

//3.删除加油站
export const delStationSite = (ids) => {
    return request({
        url:"gis/station/delStationById?id="+ids,
        method: 'post'
    })
}


//4.修改加油站信息
export const updStationSite = (data) => {
    return request({
        url:"gis/station/updateStationInfo",
        method: 'post',
        data
    })
}

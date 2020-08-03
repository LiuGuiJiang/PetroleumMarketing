import request from '../request'
/**
 * 加油站信息接口
 */

 //1.查询加油站信息
 export const selDepotSite = (params) => {
    return request({
        url:"/gis/depot/queryDepotInfos",
        method: 'GET',
        params
    })
}


//2.添加加油站信息
export const saveDepotSite = (data) => {
    return request({
        url:"gis/depot/saveDepot",
        method: 'post',
        data
    })
}

//3.删除加油站
export const delDepotSite = (ids) => {
    return request({
        url:"gis/depot/delDepotById?id="+ids,
        method: 'post'
    })
}


//4.修改加油站信息
export const updDepotSite = (data) => {
    return request({
        url:"gis/depot/updateDepotInfo",
        method: 'post',
        data
    })
}

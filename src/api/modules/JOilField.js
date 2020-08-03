import request from '../request'
/**
 * 油田、采油站接口
 */

 //1.查询油田信息
export const selOilField = (id,search,pageSize,pageNumber) => {
    return request({
        url:"/well/oilfield/selectOilfieldBySearch?id="+id+"&search="+search+"&pageNumber="+pageNumber+"&pageSize="+pageSize,
        method: 'get'
    })
}
//2.添加、修改油田信息
export const updOilField = (data) => {
    return request({
        url:"/well/oilfield/saveOilfield",
        method: 'post',
        data
    })
}

//3.删除
export const delOilField = (ids) => {
    return request({
        url:"well/oilfield/deleteOilfield?id="+ids,
        method: 'post'
    })
}
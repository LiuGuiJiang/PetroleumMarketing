import request from '../request'
/**
 * 井位信息接口
 */

 //1.查询井位信息
export const selWellSite = (id,pId,oId,search,pageSize,pageNumber) => {
    if (pageSize){
        return request({
            url:"/well/base/selectBaseBySearch?id="+id+"&pId="+pId+"&oId="+oId+"&search="+search+"&pageNumber="+pageNumber+"&pageSize="+pageSize,
            method: 'get'
        })
    } else {
        return request({
            url:"/well/base/selectBaseBySearch",
            method: 'get'
        })
    }
    
}
//2.添加、修改井位信息
export const updWellSite = (data) => {
    return request({
        url:"well/base/saveBase",
        method: 'post',
        data
    })
}

//3.删除
export const delWellSite = (ids) => {
    return request({
        url:"well/base/deleteBase?id="+ids,
        method: 'post'
    })
}
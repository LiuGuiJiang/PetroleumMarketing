import request from '../request'
/**
 * 项目信息接口
 */

 //1.查询项目信息
export const selItem = (id,search,currentPage,pageSize) => {
    return request({
        url:"well/project/selectProjectBySearch?id="+id+"&search="+search+'&pageNumber='+pageSize+"&pageSize="+currentPage,
        method: 'get'
    })
}
//2.添加、修改项目信息
export const updItem = (data) => {
    return request({
        url:"/well/project/saveProject",
        method: 'post',
        data
    })
}

//3.删除
export const delItem = (ids) => {
    return request({
        url:"well/project/deleteProject?id="+ids,
        method: 'post'
    })
}
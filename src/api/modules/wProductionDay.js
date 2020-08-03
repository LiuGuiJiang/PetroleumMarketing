import request from '../request'
/**
 * 井位信息接口
 */

 //1.查询井位信息
export const selProductionDay = (id,bId,state,search,currentPage,pageSize) => {
    return request({
        url:"well/product/selectProductBySearch?id="+id+"&bId="+bId+"&state="+state+"&search="+search+'&pageNumber='+pageSize+"&pageSize="+currentPage,
        method: 'get'
    })
}
//2.添加、修改井位信息
export const updProductionDay = (data) => {
    return request({
        url:"well/product/saveProduct",
        method: 'post',
        data
    })
}

//3.删除
export const delProductionDay = (ids) => {
    return request({
        url:"well/product/deleteProduct?id="+ids,
        method: 'post'
    })
}
import request from '../request'
/**
 * 井队管理
 */
// 查找
export const wDrillingCrew = (id,bId,search,pageSize,pageNumber) => {
    return request({
        url: 'well/team/selectTeamBySearch?id='+id+'&bId='+bId+'&search='+search+'&pageNumber='+pageNumber+'&pageSize='+pageSize,
        method: 'get',
    })
}
export const wDrillingCrew2 = () => {
    return request({
        url: 'well/team/selectTeamBySearch',
        method: 'get',
    })
}
// 新增/修改
export const upDrillingCrew = (data) => {
    return request({
        url: 'well/team/saveTeam',
        method: 'post',
        data
    })
}
//3.删除
export const deDrillingCrew = (ids) => {
    return request({
        url:"well/team/deleteTeam?id="+ids,
        method: 'post'
    })
}
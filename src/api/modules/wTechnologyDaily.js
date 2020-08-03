import request from '../request'
/**
 */

 //1.查询信息
export const selTechnologyDaily = (id,bId,state,search,currentPage,pageSize) => {
    return request({
        url:"well/skill/selectSkillBySearch?id="+id+"&bId="+bId+"&state="+state+"&search="+search+'&pageNumber='+pageSize+"&pageSize="+currentPage,
        method: 'get'
    })
}
//2.添加、修改井位信息
export const updTechnologyDaily = (data) => {
    return request({
        url:"well/skill/saveSkill",
        method: 'post',
        data
    })
}

//3.删除
export const delTechnologyDaily = (ids) => {
    return request({
        url:"well/skill/deleteSkill?id="+ids,
        method: 'post'
    })
}
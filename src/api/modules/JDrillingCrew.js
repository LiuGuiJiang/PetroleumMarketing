import request from '../request'
/**
 * 井队信息接口
 */

// 0. 按照项目分类井队列表
export const  drillingCrewList = () => {
    return request({
        url: '/well/team/selectTeamByProject',
        method: 'get'
    })
}

 //1.查询井队信息
export const selDrillingCrew = (id='',bId='',search='',pageSize,pageNumber) => {
    if(pageSize && pageNumber){
        return request({
            url:"/well/team/selectTeamBySearch?id="+id+"&bId="+bId+"&search="+search+"&pageNumber="+pageNumber+"&pageSize="+pageSize,
            method: 'get'
        })
    }else{ //查询所有
        return request({
            url:"/well/team/selectTeamBySearch",
            method: 'get'
        })
    }
    
}
//2.添加、修改井队信息
export const updDrillingCrew = (data) => {
    return request({
        url:"/well/team/saveTeam",
        method: 'post',
        data
    })
}

//3.删除
export const delDrillingCrew = (ids) => {
    return request({
        url:"/well/team/deleteTeam?id="+ids,
        method: 'post'
    })
}
/* 
 * 接口统一集成模块
 */

import * as login from './modules/login'
import * as user from './modules/user'
import * as JOilField from './modules/JOilField'
import * as JWellSite from './modules/JWellSite'
import * as JStationSite from './modules/JStationSite'
import * as JDepotSite from './modules/JDepotSite'
import * as JDrillingCrew from './modules/JDrillingCrew'
import * as wDrillingCrew from './modules/wDrillingCrew'
import * as wItem from './modules/wItem'
import * as wProductionDay from './modules/wProductionDay'
import * as wTechnologyDaily from './modules/wTechnologyDaily'
import * as loginRsa from './modules/loginRsa'


// 默认全部导出
export default {
    login,
    user,
    JOilField,
    JWellSite,
    JStationSite,
    JDepotSite,
    JDrillingCrew,
    wDrillingCrew,
    wItem,
    wProductionDay,
    wTechnologyDaily,
    loginRsa
}













 
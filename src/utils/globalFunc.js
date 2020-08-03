/**
 * 全局方法使用
 */
//1.0时间日期格式化 2019-07-04 14:08:00 注意：传入得时间不用经过new Date处理
const getLocalTime = function (timestamp) {
    var dateObj = timestamp
    return dateObj.getFullYear() + '-' +
        (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-' +
        ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate()) + ' ' +
        ((dateObj.getHours() > 9) ? dateObj.getHours() : '0' + dateObj.getHours()) + ':' +
        ((dateObj.getMinutes() > 9) ? dateObj.getMinutes() : '0' + dateObj.getMinutes()) + ':' +
        ((dateObj.getSeconds() > 9) ? dateObj.getSeconds() : '0' + dateObj.getSeconds());
}

//2.0 进入大屏
const intoTheScreen = function () {
    var docElm = document.documentElement;
     
    //W3C 
    
    if (docElm.requestFullscreen) { 
    
    docElm.requestFullscreen(); 
    
    }
    
    //FireFox 
    
    else if (docElm.mozRequestFullScreen) { 
    
    docElm.mozRequestFullScreen(); 
    
    }
    
    //Chrome等 
    
    else if (docElm.webkitRequestFullScreen) { 
    
    docElm.webkitRequestFullScreen(); 
    
    }
    
    //IE11
    
    else if (elem.msRequestFullscreen) {
    
    elem.msRequestFullscreen();
    
    }
}

//3.0 退出大屏
const outOfTime = function () {
    if (document.exitFullscreen) { 
        document.exitFullscreen(); 
    } else if (document.mozCancelFullScreen) { 
        document.mozCancelFullScreen(); 
    } else if (document.webkitCancelFullScreen) { 
        document.webkitCancelFullScreen(); 
    } else if (document.msExitFullscreen) { 
        document.msExitFullscreen(); 
    }
}

//导出所有方法
export default {
    getLocalTime,
    intoTheScreen,
    outOfTime
}
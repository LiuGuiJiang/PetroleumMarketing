//引入uuid标识
import GlobalVar from '@/utils/globalVar.js'
import store from '@/store/store.js'

var websock = null;
var global_callback = null;
var serverPort = '9002';	//webSocket连接端口
var uuid =  GlobalVar.uuid
 
function getWebIP(){ //IP
    //var curIP = window.location.hostname;
    var curIP = process.env.API_ROOT
    let colon = curIP.indexOf(":")
    curIP = curIP.slice(colon+1)
	return curIP;
}
 
function initWebSocket(){ //初始化weosocket

    //先获取上一次的uuid，再将这一次的uuid保存起来,唯一标识符
    let uuuid = sessionStorage.getItem('uuuid')
    if(!uuuid){
        uuuid = "-1"
    }
    sessionStorage.setItem('uuuid',uuid)

    //ws地址
    var wsuri = "ws:"+getWebIP()+"/imofprod/websocket/"+uuuid+"/"+uuid;
    websock = new WebSocket(wsuri);
    websock.onmessage = function(e){
    	websocketonmessage(e);
    } 
    websock.onclose = function(e){
    	websocketclose(e);
    }
    websock.onopen = function () {
	    websocketOpen();
	}
    
    //连接发生错误的回调方法
	websock.onerror = function () {
		console.log("WebSocket连接发生错误");
	}
}
 
// 实际调用的方法
function sendSock(agentData,callback){  
    global_callback = callback;
    if (websock.readyState === websock.OPEN) {
    	//若是ws开启状态
        websocketsend(agentData)
    }else if (websock.readyState === websock.CONNECTING) {
    	// 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
        	sendSock(agentData,callback);
        }, 1000);
    }else {
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData,callback);
        }, 1000);
    }
}
 
//数据接收
function websocketonmessage(e){ 
    global_callback(JSON.parse(e.data));
}
 
//数据发送
function websocketsend(agentData){
    websock.send(JSON.stringify(agentData));
}
 
//关闭
function websocketclose(e){  
    console.log("连接关闭，错误码 (" + e.code + ")");
    //如果连接关闭，则3s后重新连接
    store.commit("onIsSocket",false)
    setTimeout(() => {
        console.log("正在重新连接······")
        initWebSocket()
    }, 3000);
}
 
function websocketOpen(e){
    console.log("连接成功");
    store.commit("onIsSocket",true)
}

//连接webSocket
// initWebSocket();
 
export {sendSock}
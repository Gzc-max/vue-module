//适配手机模式
(function (doc, win) {
    var docEle = doc.documentElement,
        dpr = Math.min(win.devicePixelRatio, 3), //视网膜宽度
        scale = 1 / dpr,
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var metaEle = doc.createElement('meta');
    metaEle.name = 'viewport';
    metaEle.content = 'initial-scale=' + scale + ',maximum-scale=' + scale;
    docEle.firstElementChild.appendChild(metaEle);

    function isPCWeb() {
        var userAgentInfo = window.navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    function recalCulate() {
        if (isPCWeb()) {
            docEle.style.fontSize = 100 + 'px';
        } else {
            var width = docEle.clientWidth;
            var maxwidth = 720;
            docEle.style.fontSize = 100 * (width / maxwidth) + 'px';
        }
    }

    recalCulate();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvent, recalCulate, false); //PC端
})(document, window);


//获得http参数
function getParams() {
    var hrefArr = window.location.href.split("?");
    var query = hrefArr.length > 1 ? hrefArr[hrefArr.length - 1] : "";
    var vars = query.split("&");
    var rlt = {};
    if (hrefArr[0] && hrefArr[0].indexOf(".co.ke") != -1) {
        rlt['country'] = 'ke';
    }
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair.length >= 2) {
            rlt[pair[0]] = pair[1];
        } else {
            rlt['cn'] = pair[0];
        }
    }
    if (!rlt['shareCode']) {
        var pathDArr = (hrefArr[0].split("://")[1]).split("/");
        if (pathDArr.length >= 3) {
            rlt['shareCode'] = pathDArr[pathDArr.length - 2];
        }
    }
    return rlt;
}

//替换class
function replaceClass(id, removeClass, addClass) {
    var classStr = document.getElementById(id).getAttribute("class");
    var arr = classStr.split(" ");
    var rlt = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != removeClass && arr[i] != addClass) {
            rlt.push(arr[i]);
        }
    }
    rlt.push(addClass);
    document.getElementById(id).setAttribute("class", rlt.join(" "));
}


//显示和隐藏
function setDisplayState(id, isShow) {
    if (isShow) {
        document.getElementById(id).style.display = "block";
    } else {
        document.getElementById(id).style.display = "none";
    }
}

//显示密码规则状态
function showRulesState(index, state) {
    document.getElementById("check" + index + "Rules").checked = state;
    if (state) {
        replaceClass("span" + index + "Rules", "gre_color", "green_color");
    } else {
        replaceClass("span" + index + "Rules", "green_color", "gre_color");
    }
}

//账号规则
function accountRules(account, country) {
    if (account[0] != "0") account = "0" + account;
    var reg = /^[0-9-]+$/;
    if (!account.match(reg)) {
        return false;
    }
    if (account.length > 10) {
        if (account.length > 15) return false;
        if (account[10] != "-") return false;
    } else if (account.length == 10) {
        var re = /^[0-9]+$/;
        if (!account.match(re)) return false;
        var str = account.substring(0, 2);
        var arr = ["07"];
        if (country == "ke") {
            arr.push("01");
        } else {
            arr.push("03");
            arr.push("01");
        }
        if (arr.indexOf(account.substring(0, 2)) == -1) {
            return false;
        }
    } else {
        return false;
    }
    return true;
}

//密码规则
function passwordRules(password) {
    var errType = true;
    var regex1 = ".*[a-zA-z].*";
    var regex2 = ".*[0-9].*";
    if (!password.match(regex1)) errType = false;
    if (!password.match(regex2)) errType = false;
    if (password.length < 6 || password.length > 16) errType = false;
    return errType;
}

//验证码规则
function codeRules(account) {
    var errType = true;
    var reg = /^[0-9]+$/;
    if (!account.match(reg)) errType = false;
    if (account.length < 4 || account.length > 6) errType = false;
    return errType;
}

//获得账号
function getFullPhone(phone, nationCode) {
    if (phone[0] == "0") phone = phone.substring(1);
    return nationCode + phone;
}

function getFullUrl(url) {
    if (url.indexOf("http") != -1) {
        return url;
    }
    return (getApiHost() + url);
}

function getRewardPath() {
    return (window.location.protocol == 'http:' ? 'http://117.78.10.187:90' : 'https://casino.bangbet.co.ke/images');
}

function getApiHost() {
    return (window.location.protocol == 'http:' ? 'http://39.97.196.123' : 'https://casino-api.bangbet.com');
}

function getCurrHost() {
    return (window.location.protocol == 'http:' ? 'http://117.78.10.187:90' : 'https://casino.bangbet.co.ke');
}

//签名http请求
function httpSignAjax(method, url, params, newData, timeout, token, scret, callback, errback) {
    timeout = 30000;
    var xhr = new XMLHttpRequest();
    xhr.timeout = timeout;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            switch (xhr.status) {
                case 200:
                    {
                        window.signUesrAction = null;
                        var xhrRlt = xhr.response;
                        if (typeof xhrRlt == 'string') xhrRlt = JSON.parse(xhrRlt);
                        callback(xhrRlt);
                    };
                    break;
                default:
                    {
                        //如果链接执行错误，重新执行三次
                        if (!window.signUesrAction) {
                            window.signUesrAction = 0;
                        }
                        window.signUesrAction++;
                        if (window.signUesrAction <= 3) {
                            setTimeout(function () {
                                httpSignAjax(method, url, params, newData, timeout, token, scret, callback, errback);
                            }, 500);
                        } else {
                            errback(this._obj, xhr.response);
                        }
                        break;
                    }
            }
        }
    }.bind(this);

    //签名
    var d = ""
    if (typeof params == "string") {
        d = params;
    } else {
        d = params != "" ? JSON.stringify(params) : "";
    }
    var time = new Date().getTime().toString();
    var bodyMd5 = md5(d).toString();
    var sign = md5(token + scret + time + newData.urlStr + bodyMd5).toString();
    console.log("token:" + token);
    console.log("scret:" + scret);
    console.log("urlStr:" + newData.urlStr);

    xhr.open(method, getFullUrl(url), true);
    xhr.setRequestHeader("token", token);
    xhr.setRequestHeader("time", time);
    xhr.setRequestHeader("r", sign);
    xhr.send(d);

}

//HTTP请求
function httpAjax(method, url, params, timeout, callback, errback) {
    timeout = 30000;
    var xhr = new XMLHttpRequest();
    xhr.timeout = timeout;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            switch (xhr.status) {
                case 200:
                    {
                        window.signUesrAction = null;
                        var xhrRlt = xhr.response;
                        if (typeof xhrRlt == 'string') xhrRlt = JSON.parse(xhrRlt);
                        callback(xhrRlt);
                    };
                    break;
                default:
                    {
                        //如果链接执行错误，重新执行三次
                        if (!window.signUesrAction) {
                            window.signUesrAction = 0;
                        }
                        window.signUesrAction++;
                        if (window.signUesrAction <= 3) {
                            setTimeout(function () {
                                httpAjax(method, url, params, timeout, callback, errback);
                            }, 500);
                        } else {
                            errback(this._obj, xhr.response);
                        }
                        break;
                    }
            }
        }
    }.bind(this);
    xhr.open(method, getFullUrl(url), true);
    xhr.send(params);
}

function guid2() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    var udid = (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    return udid;
}

function getDevice() {
    var device = {
        lobbyVersion: "1.0.0",
        deviceModel: "", //设备制造商CPU名称，CPU核心数，CPU频率...
        deviceHeight: "", // 屏幕高度
        deviceWidth: "", // 屏幕宽度
        osName: "", // 操作系统
        osVersion: "", // 操作系统版本
        macAddr: "", // mac地址
        udid: guid2(), // 设备udid号
        isp: "", // 运营商
        network: "", // 网络类型4g 3G 2.5G
        appVersion: "", // 运营渠道
        imei: "",
        location: "",
        open_info: "", //
        app_base_ver: "",
        regid: "",
        isEmulator: ""
    }
    if (window.navigator) {
        device['osVersion'] = window.navigator.appVersion || "";
        device['open_info'] = window.navigator.userAgent || "";
    }
    return device;
}

function speedChangeNumber(docElement, Num, pre) {
    var gap = Math.floor(Num / 50 * 100) / 100;
    if (gap <= 0.01) {
        gap = 0.1;
    }
    var base = 0;
    var handler = setInterval(function () {
        base += gap;
        base = Math.ceil(base * 100) / 100;
        if (base >= Num) {
            base = Num;
            clearInterval(handler);
        }
        docElement.innerHTML = pre + "" + base;
    }, 30);
}

function speedChangeInteger(docElement, Num, pre) {
    var gap = Math.floor(Num / 50);
    if (gap <= 1) {
        gap = 1;
    }
    var base = 0;
    var handler = setInterval(function () {
        base += gap;
        if (base >= Num) {
            base = Num;
            clearInterval(handler);
        }
        docElement.innerHTML = pre + "" + base;
    }, 30);
}




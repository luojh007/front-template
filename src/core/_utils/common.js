import React from 'react';
import moment from 'moment';

export function randomWord(size) {
    let str = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (let i = 0; i < size; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

/**
 * 把map转换成obj
 */
export function strMapToObj(strMap) {
    const obj = Object.create(null);
    for (const [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

/**
 * 把obg转换成map
 */
export function objToStrMap(obj) {
    const strMap = new Map();
    for (const k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}


/**
 * 判断是否是IE浏览器
 */
export function IEVersion() {
    const rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.match(rMsie);
}

/**
 * 数字转换成中文（两位数）
 * @param number
 */
export function strOrNumConvert(number) {
    const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    const length = String(number).length;
    if (length === 1) {
        return zh[number];
    } else if (length === 2) {
        if (number === 10) {
            return zh[number];
        } else if (number > 10 && number < 20) {
            return `十${zh[String(number).charAt(1)]}`;
        } else {
            return `${zh[String(number).charAt(0)]}十${zh[String(number).charAt(1)].replace('零', '')}`;
        }
    }
}

/**
 * 根据后台返回的数字获取已选的code（试题属性【科室、科目】）
 * 不要随意改动这个方法
 */
export function getSelectedCode(number) {
    const twoPower30 = 1 << 30;
    // let result = '';
    const result = [];
    const smallNumber = number % twoPower30;
    for (let i = 0; i < 30; i++) {
        const value = 1 << i;
        if ((smallNumber & value) > 0) {
            // result += value + ",";
            result[result.length] = `${value}`;
        }
    }
    if (number > twoPower30) {
        const bigNumber = number - smallNumber;
        const sd = bigNumber / twoPower30;
        for (let i = 0; i < 29; i++) {
            const value = 1 << i;
            if ((sd & value) > 0) {
                // result += (value * twoPower30) + ",";
                result[result.length] = `${(value * twoPower30)}`;
            }
        }
    }
    return result;
}

/**
 * 根据数字返回字母
 */
export function formatOption(option) {
    switch (option) {
        case 0:
            return 'A';
        case 1:
            return 'B';
        case 2:
            return 'C';
        case 3:
            return 'D';
        case 4:
            return 'E';
        case 5:
            return 'F';
        case 6:
            return 'G';
        case 7:
            return 'H';
        case 8:
            return 'I';
        case 9:
            return 'J';
        case 10:
            return 'K';
        case 11:
            return 'L';
        case 12:
            return 'M';
        case 13:
            return 'N';
        case 14:
            return 'O';
        case 15:
            return 'P';
        case 16:
            return 'Q';
        case 17:
            return 'R';
        case 18:
            return 'S';
        case 19:
            return 'T';
        case 20:
            return 'U';
        case 21:
            return 'V';
        case 22:
            return 'W';
        case 23:
            return 'X';
        case 24:
            return 'Y';
        case 25:
            return 'Z';
    }
}

/**
 * 根据特定字符串转换成对象
 */
export function searchStrToObj(str) {
    let searchStr = str ? str : location.search;
    var qs = searchStr.length > 0 ? searchStr.substr(1) : '';
    var args = {};
    var items = qs.length > 0 ? qs.split('&') : [];
    var item = null, name = null, value = null, i = 0, len = items.length;
    for (i = 0; i < len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }

    return args;
}

/**
 * 排序[暂用在试卷详情]
 */
export function compare(property) {
    return (a, b) => {
        const value1 = a[property];
        const value2 = b[property];
        return value1 - value2;
    };
}
/**
* 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
* @param num1被乘数 | num2乘数
*/

export function numberMultiply(num1, num2) {
    let baseNum = 0;
    try {
        baseNum += num1.toString().split('.')[1].length;
    } catch (e) {
    }
    try {
        baseNum += num2.toString().split('.')[1].length;
    } catch (e) {
    }
    return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, baseNum);
}

/**
* 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
* @param num1被除数 | num2除数
*/
export function numberDivide(num1, num2) {
    let baseNum1 = 0;
    let baseNum2 = 0;
    let baseNum3 = null;
    let baseNum4 = null;
    try {
        baseNum1 = num1.toString().split('.')[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split('.')[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum3 = Number(num1.toString().replace('.', ''));
    baseNum4 = Number(num2.toString().replace('.', ''));
    return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
}

/**
 * 时间处理
 */
export function syncTime(from, to) {
    if (!moment.isMoment(from) || !moment.isMoment(to)) return;
    to.hour(from.hour());
    to.minute(from.minute());
    to.second(from.second());
}

/**
 * 时间处理
 */
export function rangeTime(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

/**
 * 判断下载文件是否存在
 */
export function testLink(url, okFun, errFun) {
    const xhr = getXMLHttpRequest();
    xhr.open("get", url);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (typeof okFun === 'function') okFun();
            } else {
                if (typeof errFun === 'function') errFun();
            }
        }
    };
}

/**
 * 渲染试题类型  （需要在此引入react）
 */
export function renderQuestionType(type) {
    let tpl = '';
    switch (type) {
        case 1:
            tpl = (<span className="question-type-lable single">单选题</span>);
            break;
        case 2:
            tpl = (<span className="question-type-lable multiple">多选题</span>);
            break;
        case 3:
            tpl = (<span className="question-type-lable trueFalse">判断题</span>);
            break;
        default:
            tpl = (<span className="question-type-lable fillBlank">填空题</span>);
            break;
    }
    return tpl;
}

export function getXMLHttpRequest() {
    if (window.ActiveXObject) {
        var iex = new Array("MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP4", "Microsoft.XMLHTTP");
        for (var i = 0; i < iex.length; i++) {
            try {
                var x = new ActiveXObject(iex[i]);
                return x;
            }
            catch (err) { }
        }
        return x;
    }

    else if (window.XMLHttpRequest) {
        var x = new XMLHttpRequest();
        return x;
    }
}

export function saveCache(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getCache(key) {
    return JSON.parse(localStorage.getItem(key));
}

/**
 * filter in array tree.
 */
export function arrayTreeFilter(data, filterFn, options) {
    options = options || {};
    options.childrenKeyName = options.childrenKeyName || 'children';
    var children = data || [];
    var result = [];
    var level = 0;
    var foundItem;
    do {
        var foundItem = children.filter(function (item) {
            return filterFn(item, level);
        })[0];
        if (!foundItem) {
            break;
        }
        result.push(foundItem);
        children = foundItem[options.childrenKeyName] || [];
        level += 1;
    } while (children.length > 0);
    return result;
}
export function arrHas(arr,item){
    for(let i in arr){
        if(arr[i] == item){
            return true;
        }
    }
    return false;
}
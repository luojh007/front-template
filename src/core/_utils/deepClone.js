/** @引用类型对象深拷贝
 * 遍历对象广度，并返回新对象
 *
 * @param    {array}   data
 * 
 * @returns  {object}  result
 *
 * @date     
 * @author   galaxyw<galaxybing@gmail.com>
 */

export default function deepClone(data) {
  /**
   * 返回的类型字符串表示
   */
  var getType = function(obj) {
    var toString = Object.prototype.toString; // 返回对应类型的构造函数字符串形式
    var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    };
    if (obj instanceof Element) {
      return 'element';
    }
    return map[toString.call(obj)];
  }
  
  /**
   * 根据数据值类型
   * 返回 数组|对象|简单数据
   */
  var setDefaultValue = function(val){
    var type = getType(val);
    var temp;
    if (type === 'array') {
      temp = [];
    } else if (type === 'object') {
      temp = {};
    } else {
      //不再具有下一层次
      temp = val;// 如函数
    }
    return temp;
  }
  
  var obj = setDefaultValue(data);
  var originQueue = [data];
  var copyQueue = [obj];

  // 以下两个队列用来保存复制过程中访问过的对象，以此来避免对象环的问题（对象的某个属性值是对象本身）
  var visitQueue = [];
  var copyVisitQueue = [];

  while (originQueue.length > 0) {
    var _data = originQueue.shift();
    var _obj = copyQueue.shift();
    visitQueue.push(_data);
    copyVisitQueue.push(_obj);
    for (var key in _data) {
      var _value = _data[key]
      
      if (typeof _value !== 'object') {
        _obj[key] = _value; // 直接拷贝赋值
      } else {
        // 使用indexOf可以发现数组中是否存在相同的对象(实现indexOf的难点就在于对象比较)
        var index = visitQueue.indexOf(_value);
        if (index >= 0) {
          _obj[key] = copyVisitQueue[index];
        }
        originQueue.push(_value); // 延长源数据树 进一步循环遍历

        // 生成目标对象数据树
        // _obj[key] = {};
        // 拷贝类型区分
        _obj[key] = setDefaultValue(_value);

        copyQueue.push(_obj[key]); // 依赖 引用类型值引用地址一致
      }
    }
  }
  return obj;
}
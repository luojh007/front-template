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
 *
 * @param {} obj
 * 对象转数组
 */
export function objToArr(obj) {
  const resArr = [];
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      resArr.push(obj[i]);
    }
  }
  return resArr;
}

export function saveCache(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getCache(key) {
  return JSON.parse(localStorage.getItem(key));
}

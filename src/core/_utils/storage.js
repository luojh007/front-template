export function saveCache(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getCache(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function clearCacheAll() {
  localStorage.clear()
}

export function clearCacheByKey(key) {
  localStorage.removeItem(key)
}
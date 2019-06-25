export function isPC () {
  var userAgentInfo = navigator.userAgent
  var Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  ]
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.includes(Agents[v])) {
      flag = false
      break
    }
  }
  return flag
}

let timer = null
export function debounce (fn, delay) {
  clearTimeout(timer)
  timer = setTimeout(fn, delay)
}

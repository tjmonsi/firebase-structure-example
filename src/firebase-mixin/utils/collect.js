export default (what, which) => {
  var res = {}
  while (what) {
    res = Object.assign({}, what[which], res) // Respect prototype priority
    what = Object.getPrototypeOf(what)
  }
  return res
}
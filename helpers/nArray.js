module.exports = (n, a = 0) => {
  return Array.from(Array(n)).map((i, index) => index + a)
}
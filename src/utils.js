export default class Utils {
  _random(a, b) {
    return +(Math.random() * (b - a) + a).toFixed(1)
  }
}

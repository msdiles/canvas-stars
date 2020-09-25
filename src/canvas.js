class Canvas {
  constructor(canvas) {
    this.canvas = canvas
    var ctx = this.canvas.getContext("2d")
    ctx.fillStyle = "green"
    ctx.fillRect(10, 10, 100, 100)
  }
}

export default Canvas

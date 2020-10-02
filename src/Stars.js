import Utils from "./utils"

export default class Stars extends Utils {
  constructor(n, canvasWidth, canvasHeight) {
    super()
    this.canvasHeight = canvasHeight
    this.canvasWidth = canvasWidth
    this.units = []
    this.createUnits(n)
  }

  createUnits(n) {
    for (let i = 0; i < n; i++) {
      const X = this._random(0, this.canvasWidth)
      const Y = this._random(0, this.canvasHeight)
      const radius = this._random(0, 4)
      const forceVector = {
        x: this._random(-0.8, 0.8),
        y: this._random(-0.8, 0.8),
      }

      this.units.push({ X, Y, radius, forceVector })
    }
  }

  drawUnit(canvas, unit) {
    canvas.ctx.beginPath()
    canvas.ctx.arc(unit.X, unit.Y, unit.radius, 0, 2 * Math.PI)
    canvas.ctx.fillStyle = "rgb(194,209,209)"
    canvas.ctx.fill()
  }

  unitNextFrame(unit) {
    let Y = unit.Y
    let X = unit.X
    let vector = { ...unit.forceVector }

    if (unit.Y + unit.forceVector.y < 0) {
      Y = +(unit.Y - (unit.forceVector.y - unit.Y).toFixed(1))
      vector.y = -unit.forceVector.y
    }
    if (unit.Y + unit.forceVector.y > this.canvasHeight) {
      Y = +(unit.Y - (unit.forceVector.y - unit.Y).toFixed(1))
      vector.y = -unit.forceVector.y
    }
    if (unit.X + unit.forceVector.x < 0) {
      X = +(unit.X - (unit.forceVector.x - unit.X).toFixed(1))
      vector.x = -unit.forceVector.x
    }
    if (unit.X + unit.forceVector.x > this.canvasWidth) {
      X = +(unit.X - (unit.forceVector.x - unit.X).toFixed(1))
      vector.x = -unit.forceVector.x
    }
    X = +(unit.X + unit.forceVector.x).toFixed(1)
    Y = +(unit.Y + unit.forceVector.y).toFixed(1)
    return {
      ...unit,
      forceVector: vector,
      X: X,
      Y: Y,
    }
  }
}

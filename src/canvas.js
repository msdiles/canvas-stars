import { fromEvent } from "rxjs"
import { map } from "rxjs/operators"
import Stars from "../stars"

class Canvas {
  constructor(canvas) {
    this.canvas = canvas
    this.canvas.width = canvas.offsetWidth
    this.canvas.height = canvas.offsetHeight
    this.ctx = this.canvas.getContext("2d")
    this.setBasicConf()

    this.mousePosition = { x: 0, y: 0 }

    this.circle = {
      offsetWidth: 40,
      offsetHeight: 40,
      radius: 4,
      forceVector: { x: 3, y: 1 },
    }
    this.drawFunctions = []
    this.arrayOfConnectedUnits = []
  }

  createUnits(n) {
    this.stars = new Stars(n, this.canvas.width, this.canvas.height)
  }

  drawUnits() {
    this.clearCanvas()
    this.setBasicConf()
    this.stars.units = this.stars.units.map((unit) => {
      this.stars.drawUnit(this, unit)
      const newUnit = this.stars.unitNextFrame(unit)
      return newUnit
    })
  }

  addObjectsToDraw(func) {
    this.drawFunctions.push(func)
  }

  draw() {
    const update = () => {
      this.drawFunctions.forEach((func) => {
        func.call(this)
      })
      requestAnimationFrame(update)
    }

    window.requestAnimationFrame(update)
  }

  checkMouse() {
    fromEvent(this.canvas, "mousemove")
      .pipe(
        map((e) => {
          const rect = canvas.getBoundingClientRect()
          return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          }
        })
      )
      .subscribe((e) => {
        this.mousePosition = e
      })
    setInterval(() => {
      this.arrayOfConnectedUnits = []
      this.stars.units.forEach((unit) => {
        if (
          Math.abs(this.mousePosition.x - unit.X) < 100 &&
          Math.abs(this.mousePosition.y - unit.Y) < 100
        ) {
          const vectorLength = Math.sqrt(
            (this.mousePosition.x - unit.X) ** 2 +
              (this.mousePosition.y - unit.Y) ** 2
          )
          this.arrayOfConnectedUnits.push({ ...unit, vectforLength })
        }
      })
    }, 1000 / 60)
  }

  drawLines() {
    this.arrayOfConnectedUnits.forEach((unit, idx) => {
      this.ctx.beginPath()
      this.ctx.moveTo(this.mousePosition.x, this.mousePosition.y)
      this.ctx.lineTo(unit.X, unit.Y)
      this.ctx.strokeStyle = `rgba(80,210,220,${1 / (unit.vectorLength / 50)})`
      this.ctx.lineWidth = 1 / (unit.vectorLength / 50)
      this.ctx.stroke()
    })
  }

  setBasicConf() {
    this.ctx.fillStyle = "rgb(30,30,30)"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

export default Canvas

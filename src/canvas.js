import { fromEvent } from "rxjs"
import { map } from "rxjs/operators"
import Engine from "./Engine"
import Stars from "./Stars"

class Canvas {
  constructor(canvas) {
    this.canvas = canvas
    this.canvas.width = canvas.offsetWidth
    this.canvas.height = canvas.offsetHeight
    this.ctx = this.canvas.getContext("2d")

    this.mousePosition = { x: 0, y: 0 }

    this.circle = {
      offsetWidth: 40,
      offsetHeight: 40,
      radius: 4,
      forceVector: { x: 3, y: 1 },
    }
    this.arrayOfConnectedUnits = []
    this.mouseOver=false
  }

  createUnits(n) {
    this.stars = new Stars(n, this.canvas.width, this.canvas.height)
  }

  setEngine() {
    this.engine = new Engine(this)
  }

  checkMouse() {
    const checkMouseMOve = (e) => {
      const rect = canvas.getBoundingClientRect()
      this.mousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const calculateMousePosition = () => {
      this.arrayOfConnectedUnits = []
      this.stars.units.forEach((unit) => {
        if (
          Math.abs(this.mousePosition.x - unit.X) < 200 &&
          Math.abs(this.mousePosition.y - unit.Y) < 200
        ) {
          const vectorLength = Math.sqrt(
            (this.mousePosition.x - unit.X) ** 2 +
              (this.mousePosition.y - unit.Y) ** 2
          )
          this.arrayOfConnectedUnits.push({ ...unit, vectorLength })
        }
      })
    }

    let interval

    this.canvas.addEventListener("mouseover", () => {
      this.canvas.addEventListener("mousemove", checkMouseMOve)
      interval = setInterval(calculateMousePosition,100/60)
      this.mouseOver=true
    })
    this.canvas.addEventListener("mouseout", () => {
      this.canvas.removeEventListener("mousemove", checkMouseMOve)
       clearInterval(interval)
       this.mouseOver=false

    })

  }
}

export default Canvas

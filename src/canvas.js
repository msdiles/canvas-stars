import { animationFrameScheduler, from, fromEvent, interval, of, timer } from "rxjs"
import { audit, debounce, debounceTime, map, mergeAll, tap, toArray } from "rxjs/operators"
import Stars from "../stars"

class Canvas {
  constructor(canvas) {
    this.canvas = canvas
    this.canvas.width = canvas.offsetWidth
    this.canvas.height = canvas.offsetHeight
    this.ctx = this.canvas.getContext("2d")
    this.setBasicConf()

    this.units = []
    this.circle = {
      offsetWidth: 40,
      offsetHeight: 40,
      radius: 4,
      forceVector: { x: 3, y: 1 },
    }
  }

  createUnits(n) {
    this.stars = new Stars(n, this.canvas.width, this.canvas.height)
  }

  drawUnits() {
    const canvas = this
    const scheduler = animationFrameScheduler.schedule(
      function (units) {
        of(units)
          .pipe(
            tap(() => {
              canvas.clearCanvas()
              canvas.setBasicConf()
            }),
            mergeAll(),
            tap((unit) => {
              canvas.stars.drawUnit(canvas, unit)
            }),
            map((unit) => canvas.stars.unitNextFrame(unit)),
            toArray()
          )
          .subscribe((x) => scheduler.schedule(x))
      },
      0,
      canvas.stars.units
    )
  }

  checkMouse() {
    const thisCanvas = this
    fromEvent(this.canvas, "mousemove")
      .pipe(
        map((e) => {
          const rect = canvas.getBoundingClientRect()
          return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          }
        }),
        audit(ev => interval(1000)),

      )
      .subscribe((e) => {
        console.log(e)
        // this.stars.units.forEach((unit) => {
        //   if (Math.abs(e.x - unit.X) < 50 && Math.abs(e.y - unit.Y) < 50) {
        //     this.drawLines(e, unit)
        //     // const length = +Math.sqrt(
        //     //   +Math.pow(+Math.abs(e.x - unit.X).toFixed(1), 2).toFixed(1) +
        //     //     +Math.pow(+Math.abs(e.y - unit.Y).toFixed(1), 2).toFixed(1)
        //     // ).toFixed(1)
        //     // console.log(length,unit);
        //     // connections.set(length, unit)
        //   }
        // })
        // console.log(connections);
      })
  }

  drawLines(center, unit) {
    console.log(center.x, center.y, unit)
    this.ctx.beginPath()
    this.ctx.moveTo(100, 100)
    this.ctx.lineTo(100, 100)
    this.ctx.stroke()
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

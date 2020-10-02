class Engine {
  constructor(canvas) {
    this.canvas = canvas
    this.setBasicConf()
    this.drawFunctions = []
  }

  drawUnits() {
    this.clearCanvas()
    this.setBasicConf()
    this.canvas.stars.units = this.canvas.stars.units.map((unit) => {
      this.canvas.stars.drawUnit(this.canvas, unit)
      const newUnit = this.canvas.stars.unitNextFrame(unit)
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

  drawLines() {
    if (!this.canvas.mouseOver) {
      return
    }
    this.canvas.arrayOfConnectedUnits.forEach((unit, idx) => {
      this.canvas.ctx.beginPath()
      this.canvas.ctx.moveTo(
        this.canvas.mousePosition.x,
        this.canvas.mousePosition.y
      )
      this.canvas.ctx.lineTo(unit.X, unit.Y)
      this.canvas.ctx.strokeStyle = `rgba(80,210,255,${
      (  1 / ( unit.vectorLength/20))+0.1
      })`
      // this.canvas.ctx.lineWidth = 1 / (unit.vectorLength / 20)
      this.canvas.ctx.lineWidth = 1
      this.canvas.ctx.stroke()
    })
  }

  setBasicConf() {
    this.canvas.ctx.fillStyle = "rgb(0,0,0)"
    this.canvas.ctx.fillRect(
      0,
      0,
      this.canvas.canvas.width,
      this.canvas.canvas.height
    )
  }

  clearCanvas() {
    this.canvas.ctx.clearRect(
      0,
      0,
      this.canvas.canvas.width,
      this.canvas.canvas.height
    )
  }

  drawLinesBetweenUnits(){
    this.canvas.stars.units.forEach((unitA)=>{
     this.canvas.stars.units.forEach((unitB)=>{
      if (
        Math.abs(unitA.X - unitB.X) < 150 &&
        Math.abs(unitA.Y - unitB.Y) < 150
      ) {
        const vectorLength = Math.sqrt(
          (unitA.X - unitB.X) ** 2 +
            (unitA.Y - unitB.Y) ** 2
        )
        this.canvas.ctx.beginPath()
        this.canvas.ctx.moveTo(
          unitA.X,
          unitA.Y
        )
        this.canvas.ctx.lineTo(unitB.X, unitB.Y)
        this.canvas.ctx.strokeStyle = `rgba(80,210,255,${
        (  1 / ( vectorLength/20)) -0.1
        })`
        // this.canvas.ctx.lineWidth = 1 / (unit.vectorLength / 20)
        this.canvas.ctx.lineWidth = 1
        this.canvas.ctx.stroke()
      }
     })
    })
  }

}

export default Engine

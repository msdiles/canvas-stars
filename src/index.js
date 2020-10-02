import Canvas from "./Canvas.js"

const canvasEl = document.getElementById("canvas")

const canvas = new Canvas(canvasEl)
canvas.setEngine()
canvas.createUnits(150)
canvas.engine.addObjectsToDraw(canvas.engine.drawUnits)
canvas.engine.addObjectsToDraw(canvas.engine.drawLines)
canvas.engine.addObjectsToDraw(canvas.engine.drawLinesBetweenUnits)
canvas.checkMouse()

canvas.engine.draw()

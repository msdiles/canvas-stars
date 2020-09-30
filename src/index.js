import Canvas from "./canvas.js"

const canvasEl = document.getElementById("canvas")

const canvas = new Canvas(canvasEl)
canvas.createUnits(100)
canvas.addObjectsToDraw(canvas.drawUnits)
canvas.addObjectsToDraw(canvas.drawLines)
canvas.checkMouse()

canvas.draw()

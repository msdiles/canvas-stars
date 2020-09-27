import Canvas from "./canvas.js"

const canvasEl = document.getElementById("canvas")

const canvas = new Canvas(canvasEl)
canvas.createUnits(10)
canvas.drawUnits()
canvas.checkMouse()

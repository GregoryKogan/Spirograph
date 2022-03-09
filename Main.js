let curColor = [
    Math.random() * 255,
    Math.random() * 255,
    Math.random() * 255
]
let dColor = [Math.random(), Math.random(), Math.random()]
let sticks = []
let lastEndX = undefined
let lastEndY = undefined


function setup() {
    let leftLength = Math.min(window.innerWidth, window.innerHeight) / 2
    const sticksNum = Math.floor(Math.random() * 9) + 1
    for (let i = 0; i < sticksNum; i++) {
        const desiredLength = leftLength / (sticksNum - i)
        const factor = Math.random() * 2.9 + 0.1
        const resultLength = desiredLength * factor
        leftLength -= resultLength
        angle = 0
        angularVelocity = Math.random() * Math.PI * 2 / 40
        if (Math.random() > 0.5) angularVelocity *= -1
        let stick = {
            len: resultLength,
            angle: angle,
            vel: angularVelocity
        }
        sticks.push(stick)
    }
    
    frameRate(60)
    createCanvas(window.innerWidth, window.innerHeight)
    background("#1a1b26")
}

function draw() {
    curColor[0] += dColor[0]
    curColor[1] += dColor[1]
    curColor[2] += dColor[2]
    curColor[0] %= 255
    curColor[1] %= 255
    curColor[2] %= 255
    stroke(curColor)

    let curX = window.innerWidth / 2, curY = window.innerHeight / 2

    for (let iter = 0; iter < 100; ++iter) {
        curX = window.innerWidth / 2
        curY = window.innerHeight / 2
        for (let i = 0; i < sticks.length; i++) {
            const dx = Math.cos(sticks[i].angle) * sticks[i].len
            const dy = Math.sin(sticks[i].angle) * sticks[i].len
            curX += dx
            curY += dy
            sticks[i].angle += sticks[i].vel
        }
        if (lastEndX != undefined && lastEndY != undefined)
            line(curX, curY, lastEndX, lastEndY)
        lastEndX = curX
        lastEndY = curY
    }
} 
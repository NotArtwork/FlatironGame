const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
console.log(c)

const collisionsMap = []
for ( let i = 0; i < collisions.length; i+=70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    static width = 64
    static height = 64
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 64 
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: 0,
    y: -1800
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 8659)
        boundaries.push(new Boundary({ 
            position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }}))
    })
})

console.log(boundaries)
// Image Import for Game
const image = new Image()
image.src = './img/FlatironExp.png'

const fakePlayer = new Image()
fakePlayer.src = './img/collision.png'

const playerDownImage = new Image()
playerDownImage.src = './img/AlinaDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/AlinaTop.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/AlinaLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/AlinaRight.png'


class Sprite {
    constructor({ position, velocity, image, frames = {max: 1}, sprites = []}) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
    }

draw() {
    // c.drawImage(this.image, this.position.x, this.position.y)
    c.drawImage(
        this.image,
        this.frames.val * 128 ,
        0,
        this.image.width / this.frames.max,
        this.image.height,
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,
        this.image.height
        )

        if (this.moving) {
            if (this.frames.max > 1) {
                this.frames.elapsed++
            }
        

        if (this.frames.elapsed % 10 === 0) {

            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++ }
                else {
                this.frames.val = 0}
    }
    }
    }
}

const player = new Sprite({
    position: {
        x: 600 / 2 - 960 / 8 / 2,
        y: 700 / 2 - 96 / 2
    },

    image: playerDownImage,
    frames: {
        max: 8
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const keys = {
    w: {
        pressed:false
    },
    a: {
        pressed:false
    },
    s: {
        pressed:false
    },
    d: {
        pressed:false
    }
}

const movables = [background, ...boundaries]

const touch = ({square1, square2}) => {
    console.log('boundry', square1.width, square2.width)
    return (
        (square1.position.x + square1.width) >= (square2.position.x)
    //    (square1.position.x <= square2.position.x) + (square2.width) 
    //     (square1.position.y <= square2.position.y) + (square2.height)
    //     square1.position.y + square1.height >= square2.position.y
        )
}

const animate  = () => { 
    window.requestAnimationFrame(animate)
    // console.log('homies')
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
        // if (
        //     touch({
        //         square1: player,
        //         recentagle2: boundary
        //     })
        // ) {
        //     console.log('bonk')
        // }
    })
    player.draw()
    // c.drawImage(this,
    //     0,ß
    //     0,
    //     this.width / 4,
    //     this.height,
    //     0,
    //     -1800,
    //     this.width / 4,
    //     this.height
    //     )


    let moving = true
    player.moving = false
    if (keys.w.pressed) {
        player.moving = true
        player.image = player.sprites.up
        // return instead of break for canceling movement
            for (let  i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if(touch({
                    square1: player,
                    square2: {
                        ...boundary,
                        position: {
                            x:boundary.position.x,
                            y:boundary.position.y + 3
                        }
                    }
                }))
                moving = false 
                break
            }
            if (moving) 
                movables.forEach((movable) => {
                movable.position.y += 3
            // console.log(movable)
        })
    } else if (keys.s.pressed) {
        player.moving = true
        player.image = player.sprites.down

        // return instead of break for canceling movement
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (touch({
                square1: player,
                square2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
            }))
            moving = false
            break
        }
        if (moving) 
        movables.forEach((movable) => {
            movable.position.y -= 3
        })
    } else if (keys.a.pressed) {
        player.moving = true
        player.image = player.sprites.left

        // return instead of break for canceling movement
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (touch({
                square1: player,
                square2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                }
            }))
            moving = false
            break
        }
        if (moving) 
        movables.forEach((movable) => {
            movable.position.x += 3
        })
    } else if (keys.d.pressed) {
        player.moving = true
        player.image = player.sprites.right
        // return instead of break for canceling movement
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (touch({
                square1: player,
                square2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            }))
            moving = false
            break
        }
        if (moving) 
        movables.forEach((movable) => {
            movable.position.x -= 3
        })
    }
}
animate()


// Key Event Listeners 

window.addEventListener('keydown', (e) => {

    switch (e.key) { 
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
    }
})

window.addEventListener('keyup', (e) => {

    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})


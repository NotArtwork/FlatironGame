const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Firebase Config

const fire = () => {

    let playerId;
    let playerRef;

    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
            console.log('Logged in')
            playerId = user.id;
            playerRef = firebase.database().ref(`players/${playerId}`)

            playerRef.set({
                id: playerId,
                name: "Michael",
                direction: "right",
                color: "blue",
                x: 3,
                y: 3
            })
        } else {
            console.log('Logged out')
        }
    })

    firebase.auth().signInAnonymously().catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;

        console.log(errorCode, errorMessage)
    })
}

fire()











// Flatiron Game
canvas.width = 1920
canvas.height = 1080
console.log(c)

const collisionsMap = []
for ( let i = 0; i < collisions.length; i+=70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

console.log(collisionsMap)
class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48 
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: 0,
    y: -900
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 8659)
        boundaries.push(
          new Boundary({ 
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
            console.log(this.width)
            console.log(this.height)
        }
        this.moving = false
        this.sprites = sprites
    }

draw() {
    // c.drawImage(this.image, this.position.x, this.position.y)
    c.drawImage(
        this.image,
        this.frames.val * 96 ,
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
        x: canvas.width / 2 - 192 / 8 / 2,
        y: canvas.height / 2 - 68 / 2
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


// const touch = ({rectangle, rectangle2}) => {
//     // console.log('boundry', rectangle.width, rectangle2.width)
//     return (
//     (rectangle.position.x + rectangle.width >= rectangle2.position.x) &&
//     (rectangle.position.x <= rectangle2.position.x + rectangle2.width)
//     // (rectangle.position.y <= (rectangle2.position.y + rectangle2.height))
//     // (rectangle.position.y + rectangle.height) >= (rectangle2.position.y) 
    
//     )
//     }
    
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

    const testBoundary = new Boundary({
        position: {
            x: 400,
            y: 400
        }
    })
    
    const movables = [background, ...boundaries]

const animate  = () => { 
    window.requestAnimationFrame(animate)
    // console.log('homies')
    background.draw()
    // testBoundary.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
        // if (
        //     touch({
        //         rectangle: player,
        //         rectangle2: boundary
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
        console.log('player:', player.position.x, player.position.y, 'background:', background.position.x, background.position.y)
        player.moving = true
        player.image = player.sprites.up
        // return instead of break for canceling movement
            for (let  i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if(
                   rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 1
                        }
                    }
                })){

                    moving = false 
                    break
                }
                
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
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
            })) {

                moving = false
                break
            }
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
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                }
            })){

                moving = false
                break
            }
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
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            })){
                moving = false

                break
            }
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


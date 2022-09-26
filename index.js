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
canvas.width = 1280
canvas.height = 720
console.log(c)

const collisionsMap = []
for ( let i = 0; i < collisions.length; i+=70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

const charactersMap = []
for ( let i = 0; i < characters.length; i+=70) {
    charactersMap.push(characters.slice(i, 70 + i))
}


console.log(collisionsMap)


const offset = {
    x: 0,
    y: -900
}

const boundaries = []
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

const classmates = []
const classmateImg = new Image()
classmateImg.src = './img/Test.png'

charactersMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 58051) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                }))

        classmates.push(
          new Sprite({ 
            position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        },
        image: classmateImg,
        frames: {
            max: 8,
            hold: 10
        },
        scale: 3
    }))
}})
})

console.log(boundaries)
// Image Import for Game
const image = new Image()
image.src = './img/FlatironExp.png'

const foregroundImage = new Image()
foregroundImage.src = './img/ForegroundObjects.png'


const playerDownImage = new Image()
playerDownImage.src = './img/AlinaDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/AlinaTop.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/AlinaLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/AlinaRight.png'





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

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
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
    
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

    
    const movables = [background, foreground,...boundaries, ...classmates]

    const renderables = [background, ...boundaries, ...classmates,  player, foreground]

const animate  = () => { 
    window.requestAnimationFrame(animate)
    // background.draw()
    // boundaries.forEach(boundary => {
    //     boundary.draw()

    // })
    // player.draw()
    // foreground.draw()

    renderables.forEach((renderables) => {
        renderables.draw()
    })
    let moving = true
    player.moving = false
    if (keys.w.pressed) {
        console.log('player:', player.position.x, player.position.y, 'background:', background.position.x, background.position.y)
        player.moving = true
        player.image = player.sprites.up

        // Check for Character Collision
            for (let i = 0; i < classmates.length; i++) {
                const classmate = classmates[i]
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...classmate,
                    position: {
                        x: classmate.position.x,
                        y: classmate.position.y + 3
                    }
                }
            })
            ) {
                console.log('hello')
            }
            }
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
                            y: boundary.position.y + 3
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


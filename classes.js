const { useEffect } = require("react")

class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, sprites = [], scale = 1 }) {
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elapsed: 0 }

        this.image.onload = () => {
            this.width = (this.image.width / this.frames.max) * scale
            this.height = (this.image.height) * scale;
            // console.log(this.width)
            // console.log(this.height)
        }
        this.moving = false
        this.sprites = sprites
        this.scale = scale
        this.interactionAsset
    }

    draw() {
        // c.drawImage(this.image, this.position.x, this.position.y)

        const image ={
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: this.image.width / this.frames.max,
            height: this.image.height
        }
        c.drawImage(
            this.image,
            this.frames.val * (96) / this.scale,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            image.position.x,
            image.position.y,
            image.width * this.scale,
            image.height * this.scale
        )

        if (this.moving) {
            if (this.frames.max > 1) {
                this.frames.elapsed++
            }


            if (this.frames.elapsed % 10 === 0) {

                if (this.frames.val < this.frames.max - 1) {
                    this.frames.val++
                }
                else {
                    this.frames.val = 0
                }
            }
        }
    }
}

class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'rgba(0, 0, 0, 0.0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Classmate extends Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, sprites = [], scale = 1, dialogue = [''] }) {
        super({
            position,
            velocity,
            image, 
            frames,
            sprites, 
            scale
        })
        this.dialogue = dialogue
        this.dialogueIndex = 0
    }


}




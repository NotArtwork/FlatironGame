class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d")
    }


    init() {
        const image = new Image()
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0)
        }
        image.src = "../img/MultiplayerMap.png"



        const x = 20
        const y = 20
        const hero = new Image()
        hero.onload = () => {
            this.ctx.drawImage(
                hero,
                0, // Left Cut
                0, // Top Cut
                32, // Width of Cut
                32, // Height of Cut,
                x * 16 - 8,
                y * 16 - 18,
                32,
                32,
                  )
        }
        hero.src = "../img/black suit.png"

    }


        // this.gameObject = config.gameObject;

        // this.lowerImage = new Image();
        // this.lowerImage.src = config.lowerSrc;

        // this.upperImage = new Image();
        // this.upperImage.src = config.upperSrc;
    }

    // drawLowerImage(ctx) {
    //     ctx.drawImage(this.lowerImage, 0, 0)
    // }

    // drawUpperImage(ctx) {
    //     ctx.drawImage(this.upperImage, 0, 0)
    // }


// window.OverworldMaps = {
//     DemoRoom: {
//         lowerSrc: '',
//         UpperSrc: '',
//         gameObjects: {
//             hero: new GameObject({
                
//             })
//         }
//     },

// }
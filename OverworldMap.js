class OverworldMap {
    constructor(config) {
        this.gameObject = config.gameObject;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0)
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0)
    }


}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: '',
        UpperSrc: '',
        gameObjects: {
            hero: new GameObject({
                
            })
        }
    },

}
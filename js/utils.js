function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

const checkForCharacterCollision = ({ classmates, player, classmateOffset = { x: 0, y: 0 } }) => {

    player.interactionAsset = null
    for (let i = 0; i < classmates.length; i++) {
        const classmate = classmates[i]
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: {
                ...classmate,
                position: {
                    x: classmate.position.x + classmateOffset.x,
                    y: classmate.position.y + classmateOffset.y
                }
            }
        })
        ) {
            player.interactionAsset = classmate
            break
        }
    }
}
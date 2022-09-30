const playerColors = ['blue', 'red', 'pink', 'yellow', 'black', 'green', 'purple']



// Helper Functions 

function randomFromArray(array) {
    return array(Math.floor(Math.random() * array.length))
}

function getKeyString(x, y) {
    return `${x}x${y}`
}

function createName() {
    const prefix = randomFromArray([
        "Sorry",
        "Sorta Good",
        "Terrible",
        "Great",
        "Amazing",
        "Awesome",
        "Cool",
        "Rich",
        "Soft",
        "Tough",
        "Hip",
    ])

    const animal = randomFromArray([
        "Cat",
        "Dog",
        "Fox",
        "Bear",
        "Fox",
        "Lamb",
        "Wolf",
        "Bird",
        "Bull",
        "Bug",
        "Seal"
    ])

    return `${prefix} ${animal}`
}



let playerId;
let playerRef;

function initGame() {
    const allPlayerRef = firebase.database().ref(`players`);
    const allCoinsRef = firebase.database().ref(`coins`);

    allPlayersRef.on('value', (snapshot) => {
        //whenever a player logs in
    })

    allPlayersRef.on('child_added', (snapshot) => {
        //Fires whenever a new node is added to the tree.
    })
}

firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    if (user) {
        console.log('Logged in')
        playerId = user.id;
        playerRef = firebase.database().ref(`players/${playerId}`)

        const name = createName();

        playerRef.set({
            id: playerId,
            name,
            direction: "right",
            color: randomFromArray(playerColors),
            x: 3,
            y: 3
        })


        playerRef.onDisconnect().remove();

        initGame();

    } else {
        console.log('Logged out')
    }
})

firebase.auth().signInAnonymously().catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;

    console.log(errorCode, errorMessage)
})


fire()

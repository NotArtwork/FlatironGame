const playerColors = ['blue', 'red', 'pink', 'yellow', 'black', 'green', 'purple']



// Helper Functions 

function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)]
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
let players = {};
let playerElements = {};

const gameContainer = document.querySelector("#game-container");
console.log(gameContainer);

function initGame() {
    const allPlayersRef = firebase.database().ref(`players`);
    const allCoinsRef = firebase.database().ref(`coins`);

    allPlayersRef.on('value', (snapshot) => {
        //whenever a player logs in
        players = snapshot.val() || {};
        Object.keys(players).forEach((key) => {
            const characterState = players[keys];
            let el = playerElements[key];

            el.querySelector(".Character_name").innerText = characterState.name;
            el.querySelector(".Character_coins").innerText = characterState.coins;
            el.setAttribute("data-color", characterState.color);
            el.setAttribute("data-direction", characterState.direction);
            const left =  16 * characterState.x + "px"
            const top =  16 * characterState.y + "px"
            el.style.transform = `translate3d(${left}, ${top}, 0)`
        })
    })

    allPlayersRef.on('child_added', (snapshot) => {
        //Fires whenever a new node is added to the tree.
        const addedPlayer = snapshot.val();
        const characterElement = document.createElement('div');
        characterElement.classList.add('Character', 'grid-cell');
        if (addedPlayer.id === playerId) {
            characterElement.classList.add('you');
        }
        characterElement.innerHTML = (`
            <div class="Character_shadow grid-cell"></div>
            <div class="Character_sprite grid-cell"></div>
            <div class="Character_name-container">
                <span class='character_name'></span>
                <span class='Character_coins'></span>
            </div>
            <div class="Character_you-arrow></div>
        `);

        playerElements[addedPlayer.id] = characterElement;
        characterElement.querySelector(".character_name").innerText = addedPlayer.name;
        characterElement.querySelector(".Character_coins").innerText = addedPlayer.coins;
        characterElement.setAttribute("data-color", addedPlayer.color);
        characterElement.setAttribute("data-direction", addedPlayer.direction);
        const left = 16 * addedPlayer.x + "px"
        const top = 16 * addedPlayer.y - 4 + "px";
        characterElement.style.transform = `translated3d(${left}, ${top}, 0)`;
        gameContainer.appendChild(characterElement);
    })
}

firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    if (user) {
        console.log('Logged in')
        playerId = user.uid;
        playerRef = firebase.database().ref(`players/${playerId}`)

        const name = createName();

        playerRef.set({
            id: playerId,
            name,
            direction: "right",
            color: randomFromArray(playerColors),
            x: 3,
            y: 3,
            coins: 0
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




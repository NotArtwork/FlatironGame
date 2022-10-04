const playerColors = ['blue', 'red', 'pink', 'yellow', 'black', 'green', 'purple']

// Online Functions

const msgScreen = document.getElementById('messages')
const msgForm = document.getElementById('messageForm')
const msgInput = document.getElementById('msg-input')
const msgBtn = document.getElementById('msg-btn')

const db = firebase.database()
const msgRef = db.ref('/msgs')

let myName = ""

function init() {


    msgRef.on('child_added', updateMsgs);

}

const updateMsgs = (data) => {
    console.log(data.val())
    const {name, text} = data.val();
    console.log(name)

    let names = name.split(' ') 

    let = initials = names.map((element) => {
        element[1]
    }) 

    console.log(initials)
    const msg = 
    `<li class="${name == myName ? "my-msg" : "msg"}">
    <p class ="name"> ${name} </p> <p class="text">${text}</p>
   
    </li>`

    msgScreen.innerHTML += msg;
    // document.getElementById('chat-window').scrollTop = 
    // document.getElementById('chat-window').scrollHeight;
}

function sendMessage(e) {
    e.preventDefault();
    const text = msgInput.value
    
    if(!text.trim()) return alert('Please type a message'); // No Msg Submitted Alert
    
    const msg = {
        name: myName,
        text: text
    }
    
    msgRef.push(msg)
    msgInput.value = '';
}



msgForm.addEventListener('submit', sendMessage);

// Helper Functions 

function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function getKeyString(x, y) {
    return `${x}x${y}`
}

function createName() {
    const prefix = randomFromArray([
        "Discount",
        "Sorta Good",
        "Terrible",
        "Great",
        "Amazing",
        "Awesome",
        "Send",
        "Rich",
        "Google's",
        "Tough",
        "Hip",
        "GA's"
    ])

    const animal = randomFromArray([
        "Software Engineer",
        "Spy",
        "Python Dev",
        "JavaScript",
        "5%",
        "Michael",
        "Wolf",
        "Help",
        "TypeScript",
        "Bug",
        "Art"
    ])

    return `${prefix} ${animal}`
}

function getRandomSafeSpot() {
    return randomFromArray([
        {x: 1, y: 4},
        {x: 2, y: 4},
        {x: 1, y: 6},
        {x: 5, y: 5},
        {x: 3, y: 4},
        {x: 5, y: 4},
        {x: 1, y: 4},
        {x: 4, y: 2},
        {x: 4, y: 1},
        {x: 1, y: 4},
        {x: 1, y: 10},
        {x: 3, y: 7},
        {x: 7, y: 4},
        {x: 9, y: 4},
        {x: 10, y: 4},
        {x: 1, y: 9},
        {x: 5, y: 5},
    ]);
}

let playerId;
let playerRef;
let players = {};
let playerElements = {};

const gameContainer = document.querySelector("#game-container");
const playerNameInput = document.querySelector("#player-name");
const playerColorButton = document.querySelector("#player-color");
console.log(gameContainer);

function handleArrowPress(xChange = 0, yChange = 0) {
    const newX = players[playerId].x + xChange
    const newY = players[playerId].y + yChange

    if (true) {
        players[playerId].x = newX
        players[playerId].y = newY
        if (xChange === 1) {
            players[playerId].direction = "right";
        }
        if (xChange === -1) {
            players[playerId].direction = "left";
        }

        if (yChange === 1) {
            players[playerId].direction = "up";
        }
    
        if (yChange === -1) {
            players[playerId].direction = "down";
        }

        playerRef.set(players[playerId]);
    }
}

function initGame() {

    new KeyPressListener("ArrowUp", () => handleArrowPress(0, -1))
    new KeyPressListener("ArrowDown", () => handleArrowPress(0, 1))
    new KeyPressListener("ArrowLeft", () => handleArrowPress(-1, 0))
    new KeyPressListener("ArrowRight", () => handleArrowPress(1, 0))


    const allPlayersRef = firebase.database().ref(`players`);
    const allCoinsRef = firebase.database().ref(`coins`);

    allPlayersRef.on('value', (snapshot) => {
        //whenever a player logs in
        players = snapshot.val() || {};
        Object.keys(players).forEach((key) => {
            const characterState = players[key];
            let el = playerElements[key];

            el.querySelector(".character_name").innerText = characterState.name;
            el.querySelector(".Character_coins").innerText = characterState.coins;
            el.setAttribute("data-color", characterState.color);
            el.setAttribute("data-direction", characterState.direction);
            const left =  16 * characterState.x + "px"
            const top =  16 * characterState.y + "px"
            el.style.transform = `translate3d(${left}, ${top}, 0)`;
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

    allPlayersRef.on("child_removed", (snapshot) => {
        const removedKey = snapshot.val().id
        gameContainer.removeChild(playerElements[removedKey]);
        delete playerElements[removedKey];
    })

    playerNameInput.addEventListener("change", (e) => {
        const newName = e.target.value || createName()
        playerNameInput.value = newName;
        myName = newName
        playerRef.update({
            name: newName
        })
    })
}

firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    if (user) {
        console.log('Logged in')
        playerId = user.uid;
        playerRef = firebase.database().ref(`players/${playerId}`)

        const name = createName();
        playerNameInput.value = name;
        myName = name

        const {x, y} = getRandomSafeSpot();

        playerRef.set({
            id: playerId,
            name,
            direction: "right",
            color: randomFromArray(playerColors),
            x,
            y,
            coins: "//"
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


document.addEventListener('DOMContentLoaded', init);




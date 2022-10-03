

// document.addEventListener('DOMContentLoaded', init);

//  function ChatRoom() {
//     const messagesRef = firestore.collection('messages')
//     const query = messagesRef.orderBy('createdAt').limit(25)

//     const [messages] = useCollectionData(query, {idField: 'id'})

//     messages && messages.map((msg) => {
//         const { text, uid } = msg
//         let p = document.createElement('p')
//         let chatDiv = document.createElement('div')

//         const messageClass = uid === AuthenticatorAssertionResponse.currentUser.uid ? 'sent' : 'received'
//         p.innerText = text

        
//     })
// }
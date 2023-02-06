const socket = io()
let nam;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
do{
nam = prompt('please enter your name')
}while(!nam)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user:nam,
        message:message.trim()
    }
    //append toshow in chatbox
    appendMessage(msg,'outgoing')
    textarea.value = ''
    scroll()
    //Send to server 

    socket.emit('message',
        msg
    )
}

function appendMessage(msg,types){
    let mainDiv = document.createElement('div')
    let className = types
    mainDiv.classList.add(className,'message')

    let markup = `<h4>${msg.user}</h4>
    <p>${msg.message}</p>`

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

//rcv messages

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scroll()
})

//scroll to bottom

function scroll(){
    messageArea.scrollTop = messageArea.scrollHeight
}

const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer= document.querySelector('.container');


var audio = new Audio('notification.mp3');
var audio2 = new Audio('connection_change_sound.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position =='left'){
        audio.play();
    } else if (position =='center'){
        audio2.play();
    }

    var chatlocation = document.getElementById("scrollcontainer");
    chatlocation.scrollTop = chatlocation.scrollHeight;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value ='';
});

// Joining the chatroom
const username= prompt("Enter you name to join the chatroom");
socket.emit('new-user-joined', username);

// User joined broadcast
socket.on('user-joined', username =>{
        append(`${username} joined the chat`, 'center')
});

// User left broadcast
socket.on('left', data =>{
    append(`${data.username} left the chat`, 'center')
});

// Message received
socket.on('receive', data =>{
        append(`${data.username}: ${data.message}`, 'left')
});



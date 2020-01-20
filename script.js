//client side code for the chat application is stored here 

//call socket io to let it know which server we are using
const socket = io('http://localhost:3000');

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');

const messageInput = document.getElementById('message-input');
//Add a prompt that will ask for a user name and send that to the server to keep track of the user
const name = prompt('What is your name?');
appendMessage('You joined');
socket.emit('new-user', name);
// when event is recieved call function
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
})
//When a user has connected a message will be posted
socket.on('user-connected', name => {
  appendMessage(`${name} connected`);
})
//When a user has disconnnected a message will be posted
socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`);
})
//add event listener for the submit button to send the message to the server
messageForm.addEventListener('submit', e => {
  e.preventDefault();
  // create message that will represent the value of the text box on the page
  const message = messageInput.value;
  //show user's name next to their message when they click submit
  appendMessage(`You: ${message}`)
  // send the message with socket it
  socket.emit('send-chat-message', message);
  //reset message input after sending message
  messageInput.value = '';
}) 
//Function to append the messages to the actual index file
function appendMessage(message){
  //Create a new div everytime a new message is sent
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
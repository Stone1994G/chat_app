//npm console code to enter
//Must have Node installed on local pc
//npm i socket.io <-- we need this to have the network socket to enable 
//real time chat. in cmd type: npm run devStart,,, then nodemon server.js

//Create server with socket io --  pass 3000 as the port we will use
const io = require('socket.io')(3000);
//create user object
const users = {}
//anytime user connects to server this request will start which is just a message
io.on('connection', socket => {
  socket.on('new-user', name =>{
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  })
  //When user sent message from client side it will tranverse to the server side here and broadcast itself
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]});
  })
  //Inform other users when a user disconnects
  socket.on('disconnect', () =>{
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  })
})
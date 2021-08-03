const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const app = express();

app.use(cors());


const server = http.createServer(app);
const io = socketIO(server);

const users = {};
const allUsers = [];

io.on("connection",(socket) => {
    console.log('New Connection');

    socket.on('joined',(data)=>{
        users[socket.id] = data.user;
        const usersDetail = {
            id: socket.id,
            name: data.user,
            isLoggedIn: true
        }
        const userIndex = allUsers?.findIndex((item) => item.name === usersDetail.name);
        console.log(userIndex)
        if(userIndex < 0){
            allUsers.push(usersDetail)
        }
        else{
            allUsers[userIndex].isLoggedIn = true;
        }
        console.log(allUsers);
        console.log(`${data.user} has joined!!`)
        socket.emit('welcome',{user: 'Admin', message: `Welcome to the chat, ${users[socket.id]}!!`,connections: allUsers})
        socket.broadcast.emit('userJoined',{ user: 'Admin', message: `${users[socket.id]} has joined`,connections: allUsers })
    })

    

    socket.on('message',(data) => {
        io.emit('sendMessage', { user: users[data.id] , message: data.message, id: data.id })
    })

    socket.on('disconnect',() => { 
        const userIndex = allUsers?.findIndex((item) => item.name === users[socket.id]);
        allUsers[userIndex].isLoggedIn = false;
        socket.broadcast.emit('userLeft',{ user: 'Admin', message: `${users[socket.id]} left`,connections: allUsers }) 
        delete users[socket.id]
    })
})

app.get('users',(req,res) => {
    res.send(users)
})

const port = 8000;
server.listen(port, () => console.log(`Server Started at http://localhost:${port}`));


import React,{useEffect, useState} from 'react';
import io from 'socket.io-client';
import { user } from '../login';
import Message from '../message';
import ReactScrollToBottom from 'react-scroll-to-bottom';


const ENDPOINT = 'http://localhost:8000/';
let socket;

const Home = () => {

    const [id, setId] = useState('');
    const [messages, setMessages] = useState([]);
    const [friends, setFriends] = useState([]);

    const send = () =>{
        const message = document.getElementById('chat-input').value;
        socket.emit('message',{ message, id })
        document.getElementById('chat-input').value = '';
    }

    useEffect(() => {
        socket = io(ENDPOINT, { transports: ['websocket'] });    
        
        socket.on("connect", () => {
            setId(socket.id)
        })

        socket.emit('joined',{user})
        
        socket.on('welcome', (data) =>{
            setMessages([...messages,data]);
            setFriends([...data.connections])
            console.log(friends)
            console.log(data.user,data.message);
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [])

    useEffect(() => {

        socket.on('sendMessage', (data) => {
            setMessages([...messages, data])
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages,data])
            setFriends([...data.connections])
            console.log(friends)
            console.log(data.user,data.message);
        })

        socket.on('userLeft',(data) => {
            setMessages([...messages,data])
            setFriends([...data.connections])
            console.log(friends)
            console.log(data.user,data.message)
        })

        return () => {
            socket.off();
        }
    }, [messages])


    return (<div id="chat-room-wrapper">
        <Topbar /> 
        <div id="chat-room">
            <div id="user-container">
                <div className='header'>
                    <p>Your Friends</p>
                </div>
                <ReactScrollToBottom className="users">
                    {friends.map((item) => {if(item.name !== user) return <Friend user={item} /> })}
                </ReactScrollToBottom>
            </div>
            <div id="chat-container">
                <div className="header">
                    <p>My Chat App</p>
                    <a href="/">Logout</a>
                </div>
                <ReactScrollToBottom className="chat-box">
                    {messages.map((item, index) => <Message index= {index} user={item.id===id?"You": item.user} message={item.message} classs={item.id===id?"right":"left"} />)}
                </ReactScrollToBottom>
                <div className="input-box">
                    <input type="text" id="chat-input" placeholder="Type your message...."/>
                    <button onClick={send} className="send-btn">Send</button>
                </div>
            </div>
        </div> 
    </div>);
}
 
export default Home;

const Topbar = () => {
    return ( <div id="topbar">
        <p>Welcome to Chat Room, share messages to your friends!!!</p>
    </div> );
}

const Friend = ({ user }) => {
    return ( <div className="friend">
        <p className={user.isLoggedIn === true ? "green": "red"}>{user.name}</p>
    </div> );
}
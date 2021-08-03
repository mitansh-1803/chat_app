import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';


let user;

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassWord] = useState('');
    const [goToHome, setGoToHome] = useState(false);


    const login = () =>{
        user = document.getElementById('user').value
        const userDetail = {
            username: username,
            password: password,
        }
        if(userDetail.username.length && userDetail.password === "1234"){
            setGoToHome(true);
        }
        else{
            alert("Please Enter your Username/Password")
        }
        setUsername('');
        setPassWord('');
    }

    return (<div>
        {goToHome && <Redirect to='/home' />}
        <div id="main-container">
            <div>
                <h1 className="heading" >My Chat App</h1>
                <input id="user" type="text" placeholder="Enter Username...." onChange={(e)=> setUsername(e.target.value)} value={username} /> <br />
                <input type="password" placeholder="Enter Password...." onChange={(e)=> setPassWord(e.target.value)} value={password} /> <br />
                <button onClick={login}>Login</button>
            </div>
        </div>
    </div> );
}
 
export default LoginPage;

export {user}
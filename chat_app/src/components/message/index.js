import React from 'react';

const Message = ({index, user, message, classs }) => {

    return ( <div key = {index} className={`message-box ${classs}`}>
        <p>{ `${user}: ${message}` }</p>
    </div> );
}
export default Message;
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import './ChatBox.css';
import { FaPaperPlane } from 'react-icons/fa'; 
import { MdChat } from 'react-icons/md'; 

const socket = io('http://localhost:5000');

const ChatBox = () => {
    const role = useSelector((state) => state.auth.role);
    const recipient = role === 'admin' ? 'student' : 'admin';

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatOpen, setChatOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0); 

    useEffect(() => {
        socket.emit('loadMessages', role);

        socket.on('receiveMessage', (message) => {
            console.log("Received message:", message);
            if (message.sender !== role) {
                setMessages((prevMessages) => [...prevMessages, message]);
                setUnreadCount((prevCount) => prevCount + 1); 
            }
        });

        socket.on('messagesLoaded', (loadedMessages) => {
            console.log("Loaded messages:", loadedMessages);
            const validMessages = loadedMessages.filter(msg => msg && msg.sender && msg.message);
            setMessages(validMessages);
        });

        return () => {
            socket.off('receiveMessage');
            socket.off('messagesLoaded');
        };
    }, [role]);

    const handleSend = () => {
        if (newMessage.trim() && role) {
            const messageData = {
                sender: role,
                recipient: recipient,
                message: newMessage,
            };
            console.log("Sending message data:", messageData);
            socket.emit('sendMessage', messageData); 

            setMessages((prevMessages) => [...prevMessages, messageData]);
            setNewMessage(''); 
        } else {
            console.error("Role is not set or message is empty.");
        }
    };

    const handleClearChat = () => {
        socket.emit('clearChat');
        setMessages([]);
    };

    return (
        <div className="chat-container">
            <button className="chat-toggle-button" onClick={() => setChatOpen(!chatOpen)}>
                <MdChat size={24} />
                {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>} 
            </button>
            {chatOpen && (
                <div className="chat-box">
                    <h2 className="chat-title">Chat with {recipient.charAt(0).toUpperCase() + recipient.slice(1)}</h2>
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                                <strong>{msg.sender.charAt(0).toUpperCase() + msg.sender.slice(1)}:</strong>
                                <span>{msg.message}</span>
                            </div>
                        ))}
                    </div>
                    <div className="chat-input-area ">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                         <button onClick={handleSend}>
                            <FaPaperPlane />
                        </button>

                    </div>
                  
                    <button className="clear-chat-button" onClick={handleClearChat}>Clear Chat</button>
                </div>
            )}
        </div>
    );
};

export default ChatBox;






































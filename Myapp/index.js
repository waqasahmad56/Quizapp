import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import Message from './models/Message.js';
import userRoutes from './routes/userRoutes.js'; 

dotenv.config(); 

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));


const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});


io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    
    socket.on('loadMessages', async (role) => {
        console.log("Loading messages for role:", role);
        try {
            const messages = await Message.find({
                $or: [
                    { sender: role },
                    { recipient: role }
                ]
            }).sort({ timestamp: 1 });

            socket.emit('messagesLoaded', messages);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    });

    socket.on('sendMessage', async (data) => {
        console.log("Received message data:", data);
        const { sender, recipient, message } = data;

        if (!sender || !recipient || !message) {
            console.error("Missing required fields:", { sender, recipient, message });
            return; 
        }

        const newMessage = new Message({ sender, recipient, message, timestamp: new Date() });
        try {
            await newMessage.save();  
            console.log('Message saved:', newMessage);
            io.emit('receiveMessage', newMessage); 
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('clearChat', async () => {
        try {
            await Message.deleteMany({}); 
            io.emit('chatCleared');
            console.log('Chat cleared');
        } catch (error) {
            console.error('Error clearing chat:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
app.use('/auth/users', userRoutes);
 app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






















































































































































































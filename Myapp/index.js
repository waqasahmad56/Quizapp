import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import Message from './models/Message.js';
import userRoutes from './routes/userRoutes.js';
import Notification from './models/Notification.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

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
                $or: [{ sender: role }, { recipient: role }]
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

app.post('/send', async (req, res) => {
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
  
    try {
      const newNotification = new Notification({ message });
      
      await newNotification.save();
  
      io.emit('pushNotification', { message });
      
      res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
      console.error('Error saving notification:', error);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  });

  app.get('/notifications', async (req, res) => {
    try {
      const notifications = await Notification.find().sort({ timestamp: -1 }); 
  
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  });
  
// app.post('/send', (req, res) => {
//     const message = req.body.message;
//     console.log(message);
//     io.emit('pushNotification', { message });
//     res.status(200).send({ message: 'sent successfully' });
// });

app.use('/auth/users', userRoutes);
app.use('/uploads', express.static('uploads'));

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






























































































































































































































































































































































































































































































































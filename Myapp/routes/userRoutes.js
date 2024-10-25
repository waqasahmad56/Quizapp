import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Quiz from '../models/Quiz.js';
import Profile from '../models/Profile.js';
import Result from '../models/Result.js';
import Quizz from '../models/Quizz.js';
import Record from '../models/Record.js';
import dotenv from 'dotenv';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';


dotenv.config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage });

 router.post('/signup', async (req, res) => {
   const { firstname, lastname, email, password, role, secretKey } = req.body;

   if (!firstname || !lastname || !email || !password) {
     return res.status(400).json({ message: 'All fields are required' });
   }
  
   if (role === 'admin' && secretKey !== process.env.ADMIN_SECRET_KEY) {
     return res.status(403).json({ message: 'Invalid secret key for admin' });
   }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    
  }

     const hashedPassword = await bcrypt.hash(password, 10);
     const newUser = new User({ firstname, lastname, email, password: hashedPassword, role });
     await newUser.save();
     res.status(201).json({ message: 'User created' });
   } catch (err) {
     console.error('Error:', err);
     res.status(500).json({ message: "Server error" });
   }
 });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '4h' });
    res.json({ token, role: user.role });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
});

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
}


router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the dashboard' });
});


router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpire = Date.now() + 3600000; 

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpire;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested a password reset. 
             Please click on the following link, or paste it into your browser to complete the process:
             ${resetUrl}
             If you did not request this, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset link sent' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/create-quiz', async (req, res) => {
  const { title, questions } = req.body;

  if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: 'Invalid quiz data' });
  }

  const newQuiz = new Quiz({
    title,
    questions: questions.map((question) => ({
      questionText: question.questionText,
      options: question.options.map(optionText => ({ optionText })),
      correctAnswer: question.correctAnswer,
      difficulty: question.difficulty 
    }))
  });
 
  try {
    const savedQuiz = await newQuiz.save(); 

    res.status(201).json({ message: 'Quiz created successfully', quiz: savedQuiz });
    
   
  } catch (error) {
    res.status(500).json({ message: 'Failed to create quiz', error: error.message });
  }
});


router.get('/quizzes', async (req, res) => {
  try {
      const quizzes = await Quiz.find();
      res.json(quizzes);
  } catch (error) {
      res.status(500).json({ message: "Error fetching quizzes", error });
  }
});


router.delete('/quizzes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/quizzes/:id', async (req, res) => {
  const { id } = req.params;
  const updatedQuizData = req.body;

  try {
      const updatedQuiz = await Quiz.findByIdAndUpdate(id, updatedQuizData, { new: true });
      if (!updatedQuiz) {
          return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(updatedQuiz);
  } catch (error) {
      res.status(500).json({ message: "Error updating quiz", error });
  }
});


router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});


router.post('/users', async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstname, lastname, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});


router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(id, { firstname, lastname, email, password: hashedPassword, role }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
});


router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error });
  }
});

router.post('/profile', upload.single('profilePic'), async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const profilePic = req.file ? path.basename(req.file.path) : '';  

  try {
    const newProfile = new Profile({
      firstName,
      lastName,
      email,
      password,
      profilePic,
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving profile' });
  }
});

router.get('/question/quizzes', async (req, res) => {
  const { title, difficulty } = req.query;

  const filters = {};
  if (title) {
      filters.title = { $regex: title, $options: 'i' }; 
  }
  if (difficulty) {
      filters['questions.difficulty'] = difficulty;
  }
   
  try {
      const quizzes = await Quiz.find(filters);
      res.json(quizzes);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne(); 
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/results', async (req, res) => {
  try {
    const { studentId, quizId, startTime, endTime, totalQuestions, correctAnswers, incorrectAnswers, duration, resultPercentage, status } = req.body;

    const result = new Result({
      studentId,
      quizId,
      startTime,
      endTime,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      duration,
      resultPercentage,
      status
    });

    await result.save();
    res.status(201).json({ message: 'Results saved successfully' });
  } catch (error) {
    console.error('Error saving quiz results:', error);
    res.status(500).json({ message: 'Failed to save quiz results', error: error.message });
  }
});


router.get('/resultss', async (req, res) => {
  try {
      
    const results = await Result.find().populate('studentId', 'firstName lastName').exec();
    
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Failed to fetch results' });
  }
});


router.post('/quizques', async (req, res) => {
  const { title, questions } = req.body;

  
  if (!title || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: 'Title and questions are required.' });
  }

  
  for (const question of questions) {
    const { questionParagraph, options, correctAnswer, difficulty } = question;
    
    if (!questionParagraph || !Array.isArray(options) || options.length !== 4 || 
        !correctAnswer || !difficulty) {
      return res.status(400).json({ error: 'Each question must have a paragraph, 4 options, correct answer, and difficulty.' });
    }
  }

  try {
    const newQuizz = new Quizz({
      title,
      questions
    });

    await newQuizz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz: newQuizz });
  } catch (error) {
    res.status(500).json({ error: 'Error saving quiz: ' + error.message });
  }
});
router.get('/quizques', async (req, res) => {
  try {
    const quizzes = await Quizz.find(); 
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quizzes: ' + error.message });
  }
});

router.post('/savequizresult', async (req, res) => {
  
  const {
    quizId,
    studentId,
    startTime,
    endTime,
    timeSpent,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    percentage,
    status,
    questionTimes,
    correctAnswersList,

  } = req.body;

   if (!quizId || !studentId || !startTime || !endTime || totalQuestions === undefined || 
       correctAnswers === undefined || incorrectAnswers === undefined) {
     return res.status(400).json({ error: 'All fields are required.' });
   }

  try {
    const newRecord = new Record({
      quizId,
      studentId,
      startTime,
      endTime,
      timeSpent,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      percentage,
      status,
      questionTimes,
      correctAnswersList
    
    });
  
    await newRecord.save();
    res.status(201).json({ message: 'Quiz result saved successfully', record: newRecord });
  } catch (error) {
    res.status(500).json({ error: 'Error saving quiz result: ' + error.message });
  }
});

router.get('/results', async (req, res) => {
  try {
    const results = await Record.find({ });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/student/:email', async (req, res) => {
  try {
      const student = await User.findOne({ email: req.params.email });
      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});


export default router;





































































































































































































































































































































































































































































































































































































































































































































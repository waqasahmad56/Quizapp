
import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Quizz',
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Profile',
  },
 
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  timeSpent: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  incorrectAnswers: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pass', 'fail'],
    required: true,
  },
  questionTimes: { type: [Number], required: true },
  correctAnswersList: { 
    type: [String], 
    required: true,
  }

}, {
  timestamps: true,
});

const Record = mongoose.model('Record', recordSchema);

export default Record;




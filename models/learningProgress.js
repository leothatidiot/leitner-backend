const mongoose = require('mongoose')

const learningProgressSchema = new mongoose.Schema({
  // 确定 user A 正在学习的 deck B 中的 card C
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
    required: true
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true
  },

  // card 学习状态信息 用于实现SM-2算法
  n: { // repetition number n, succussfully recalled in a row
    type: Number,
    required: true,
    default: 0
  },
  EF: { // easiness factor EF, initial value of EF is 2.5
    type: Number,
    required: true,
    default: 2.5
  },
  I: { // inter-repetition interval I, length of time (in days)
    type: Number,
    required: true,
    default: 1
  },
  lastAnswered: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('LearningProgress', learningProgressSchema)

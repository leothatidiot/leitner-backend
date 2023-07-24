const mongoose = require('mongoose')

const LearningProgress = require('../models/learningProgress')
const Card = require('../models/card')

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

const random50Cards = () => {
  return new Promise((resolve, reject) => {
    Card.aggregate([
      { $sample: { size: 50 } }
    ]).then((docs) => {
      resolve(docs)
    }).catch((err) => {
      reject(err)
    })
  })
}

const SM2 = (q, n, EF, I) => {
  if (q > 3) { // correct response
    if (n === 0) {
      I = 1
    } else if (n === 1) {
      I = 6
    } else {
      I = I * (n - 1) * EF
    }
    n++
  } else { // incorrect response
    n = 0
    I = 1
  }

  EF = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))

  if (EF < 1.3) {
    EF = 1.3
  }

  const res = { n, EF, I }
  return res
}

module.exports = {
  async schedule (req, res) {
    // 此 api 返回一个 schedule cardId array
    if (req.user === null) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const userAdeckB = { // user A, currently learning deck B
      user: req.user._id,
      deck: new mongoose.Types.ObjectId(req.body.deck)
    }

    const progresses = await LearningProgress.find(userAdeckB)
    if (progresses.length === 0) {
      // 这个用户 在这个deck 没有任何学习进度
      console.log('这个用户 在这个deck 没有任何学习进度')
      // 随机 一些card 返回他们的ID array
      random50Cards().then(cards => {
        return res.json(cards)
      }).catch(err => {
        return res.status(500).json({ message: err })
      })
    } else {
      // 有 学习进度
      // 确定有多少待复习 分情况 >=50 <50

      // 所有进度 确定复习时间点并排序
      const sortedProgresses = progresses.map(item => {
        return {
          _id: item._id,
          reviewDate: item.lastAnswered.addDays(item.I)
        }
      }).sort((a, b) => {
        return new Date(b.reviewDate) - new Date(a.reviewDate)
      })

      // 复习时间点 = lastAnswered + I
      // 复习时间点从小到大排序 需复习[-x, 0] (0, y]不需复习
      // (-inf, 0] 到期 (0, +inf) 非到期
      const expired = sortedProgresses.filter((item) => item.reviewDate < Date.now())

      if (expired.length !== 0) { // 有“到期”
        return res.json(expired)
      } else { // 没有“到期”
        // 随机 一些card 返回他们的ID array
        random50Cards().then(cards => {
          return res.json(cards)
        }).then(err => {
          return res.status(500).json({ message: err })
        })
      }
    }
  },

  async answer (req, res) {
    console.log(req)

    if (req.user === null) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    // 更新或插入一条数据到 learningprogresses
    // q, (userId, DeckId, cardId) learningProgressId

    const { q } = req.q

    LearningProgress.find({
      user: req.user._id,
      deck: req.deck._id,
      card: req.card._id
    }).then(searchRes => { // MongoDB 检索结果
      if (searchRes.length !== 0) {
        // 学过
        console.log(searchRes)
        SM2(q, 1, 1, 1)
      } else {
        // 没学过
        const newRecord = {
          user: req.user._id,
          deck: req.deck._id,
          card: req.card._id,
          n: 0,
          EF: 2.5,
          I: 1,
          lastAnswered: Date.now
        }
        LearningProgress(newRecord).save()
      }
    })
  }
}

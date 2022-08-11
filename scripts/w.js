const fetch = require('node-fetch')
require('dotenv').config()

function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000)
  })
}

const toGrass = (number) => {
  if (number == 0) {
    return ':0xebedf0:'
  } else if (1 <= number && number < 5) {
    return ':0x9be9a8:'
  } else if (5 <= number && number < 15) {
    return ':0x40c463:'
  } else if (15 <= number && number < 30) {
    return ':0x30a14e:'
  } else if (30 <= number) {
    return ':0x216e39:'
  } else {
    return ':null:'
  }
}
const oneDaySecond = 1000 * 60 * 60 * 24

module.exports = (robot) => {
  robot.respond(/草.*/i, async (response) => {
    const userId = response.message.message.plainText.split(' ')[2]
    const monthArg = Number(response.message.message.plainText.split(' ')[3])
    if (isNaN(monthArg) && monthArg !== undefined) {
      response.send('月の指定が不正です')
      return
    }
    let userUuid = ''
    const url = `https://q.trap.jp/api/v3/users?include-suspended=false&name=${userId}`
    flag = false
    await fetch(url, {
      headers: {
        Authorization: process.env.ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          userUuid = data[0].id
        } catch (err) {
          flag = true
        }
      })
      .catch((err) => {
        response.reply(err)
      })
    if (flag) {
      response.reply('ユーザーが見つかりませんでした')
      return
    }
    const numbers = []
    const today = new Date()
    const youbi = today.getDay() + 1
    for (let i = -1; i < 27; i++) {
      const day = new Date(today.getTime() - i * oneDaySecond)
      const year = day.getFullYear()
      const month = (day.getMonth() + 1 - monthArg).toString().padStart(2, '0')
      const date = day.getDate().toString().padStart(2, '0')
      const prevDay = new Date(today.getTime() - (i + 1) * oneDaySecond)
      const prevYear = prevDay.getFullYear()
      const prevMonth = (prevDay.getMonth() + 1 - monthArg)
        .toString()
        .padStart(2, '0')
      const prevDate = prevDay.getDate().toString().padStart(2, '0')
      const url = `https://q.trap.jp/api/v3/messages?word=&after=${prevYear}-${prevMonth}-${prevDate}T00%3A00%3A00.000Z&before=${year}-${month}-${date}T00%3A00%3A00.000Z&from=${userUuid}&limit=1&offset=0&sort=createdAt`
      await fetch(url, {
        headers: {
          Authorization: process.env.ACCESS_TOKEN,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          numbers.push(data.totalHits)
        })
        .catch((err) => {
          response.reply(err)
        })
      await delay(0.2)
    }
    numbers.reverse()
    let responseMessage = ''
    let currentIndex = 0
    const w = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ]
    for (let i = 0; i < youbi; i++) {
      w[0][i] = ':null:'
    }
    for (let i = youbi; i < 7; i++) {
      w[0][i] = toGrass(numbers[currentIndex])
      currentIndex++
    }
    for (let i = 1; i < 4; i++) {
      for (let j = 0; j < 7; j++) {
        w[i][j] = toGrass(numbers[currentIndex])
        currentIndex++
      }
    }
    for (let i = 0; i < youbi; i++) {
      w[4][i] = toGrass(numbers[currentIndex])
      currentIndex++
    }
    for (let i = youbi; i < 7; i++) {
      w[4][i] = ':null:'
    }
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 7; j++) {
        responseMessage += ` ${w[i][j]}`
      }
      responseMessage += '\n'
    }
    await delay(2)
    response.send(responseMessage)
  })
}

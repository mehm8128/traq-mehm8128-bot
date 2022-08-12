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

module.exports = (robot) => {
  robot.respond(/草.*/i, async (response) => {
    let since = response.message.message.plainText.match(
      /since:(\d{4}-\d{2}-\d{2})/
    )
    let until = response.message.message.plainText.match(
      /until:(\d{4}-\d{2}-\d{2})/
    )
    let userId = response.message.message.plainText.match(/user:(\w*)/)
    let borderDate = null
    let youbi = 0
    let mode = 0 //1:sinceを指定,-1:untilを指定
    if (since === null && until === null) {
      borderDate = new Date()
      youbi = borderDate.getDay()
      mode = -1
    } else if (since !== null && until === null) {
      since = since[1]
      borderDate = new Date(
        since.slice(0, 4) +
          '-' +
          Number(since.slice(5, 7)).toString().padStart(2, '0') +
          '-' +
          since.slice(8)
      )
      youbi = borderDate.getDay()
      mode = 1
    } else if (since === null && until !== null) {
      until = until[1]
      borderDate = new Date(
        until.slice(0, 4) +
          '-' +
          Number(until.slice(5, 7)).toString().padStart(2, '0') +
          '-' +
          until.slice(8)
      )
      youbi = borderDate.getDay()
      mode = -1
    } else if (since !== null && until !== null) {
      response.send('sinceとuntilをどちらも指定することはできません')
      return
    }
    if (userId === null) {
      userId = response.message.message.user.name
    } else {
      userId = userId[1]
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
    for (let i = 0; i < 28; i++) {
      let year
      let month
      let date
      let nextYear
      let nextMonth
      let nextDate
      year = borderDate.getFullYear()
      month = (borderDate.getMonth() + 1).toString().padStart(2, '0')
      date = borderDate.getDate().toString().padStart(2, '0')
      nextBorderDate = new Date(`${year}-${month}-${date}`)
      nextBorderDate.setDate(nextBorderDate.getDate() + 1)
      nextYear = nextBorderDate.getFullYear()
      nextMonth = (nextBorderDate.getMonth() + 1).toString().padStart(2, '0')
      nextDate = nextBorderDate.getDate().toString().padStart(2, '0')
      borderDate.setDate(borderDate.getDate() + mode)
      const url = `https://q.trap.jp/api/v3/messages?word=&after=${year}-${month}-${date}T00%3A00%3A00.000Z&before=${nextYear}-${nextMonth}-${nextDate}T00%3A00%3A00.000Z&from=${userUuid}&limit=1&offset=0&sort=createdAt`
      console.log(url)
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
      await delay(0.1)
    }
    if (mode === -1) {
      numbers.reverse()
    } else {
      youbi -= 1
    }
    let responseMessage = ''
    let currentIndex = 0
    const w = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ]
    for (let i = 0; i < youbi + 1; i++) {
      w[0][i] = ':null:'
    }
    for (let i = youbi + 1; i < 7; i++) {
      w[0][i] = toGrass(numbers[currentIndex])
      currentIndex++
    }
    for (let i = 1; i < 4; i++) {
      for (let j = 0; j < 7; j++) {
        w[i][j] = toGrass(numbers[currentIndex])
        currentIndex++
      }
    }
    for (let i = 0; i < youbi + 1; i++) {
      w[4][i] = toGrass(numbers[currentIndex])
      currentIndex++
    }
    for (let i = youbi + 1; i < 7; i++) {
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

/*
どのユーザー(メンション)に対しての草なのかを明示する→指定されたユーザー名を最初に書けばいい
*/

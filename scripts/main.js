const fetch = require('node-fetch')
module.exports = (robot) => {
  robot.respond(/ping$/i, (res) => {
    res.reply('pong!')
  })
  robot.respond(/((何|なに)ができるの？|できること|機能|help)/i, (res) => {
    res.reply(
      '現在できることは\n- ping=>pong\n- help=>できること\n- AtCoder id=>前回のコンテストの結果\nです！'
    )
  })
  robot.respond(/AtCoder.*/i, (response) => {
    const userId = response.message.message.plainText.split(' ')[2]
    const url = `https://atcoder.jp/users/${userId}/history/json`
    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        const l = json.length
        const result = json[l - 1]
        response.reply(
          `前回参加した${result.ContestName}の結果はパフォーマンスは${result.Performance}で、レートが${result.OldRating}からに${result.NewRating}に変化しました！`
        )
      })
      .catch((err) => {
        response.reply(err)
      })
  })
  robot.catchAll((res) => {
    if (res.message.type === 'BotMessageStampsUpdated') {
      const messageId = res.message.messageId
      const stamps = res.message.stamps
      if (!stamps) return
      if (stamps.length > 5) {
        for (let i = 0; i < stamps.length; i++) {
          if (stamps[i].count > 3) return
        }
      }
      robot.send(
        { userID: 'c714a848-2886-4c10-a313-de9bc61cb2bb' },
        `${messageId}で:${
          stamps[stamps.length - 1].stampName
        }:がつけられましたかもしれません`
      )
    }
  })
}

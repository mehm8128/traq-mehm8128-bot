const fetch = require('node-fetch')
module.exports = (robot) => {
  robot.respond(/ping$/i, (res) => {
    res.reply('pong!')
  })
  robot.respond(/((何|なに)ができるの？|できること|機能|help)/i, (res) => {
    res.reply(
      '現在できることは\n- ping=>pong\n- help=>できること\n- AtCoder id=>前回のコンテストの結果\n- メッセージに最初にスタンプがつけられたらmehm8128のDMに送信\nです！'
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
      if (stamps.length !== 1) return
      if (stamps[0].count !== 1) return
      robot.send(
        { userID: 'c714a848-2886-4c10-a313-de9bc61cb2bb' },
        `https://q.trap.jp/messages/${messageId} で:${
          stamps[stamps.length - 1].stampName
        }:がつけられましたかもしれません`
      )
    }
  })
}

const fetch = require('node-fetch')
module.exports = (robot) => {
  // "@botName hoge"を受け取ったら"@senderName fuga"を送り返す
  robot.respond(/ping$/i, (res) => {
    res.reply('pong!')
  })
  robot.respond(/AtCoder/i, (response) => {
    const url = `https://atcoder.jp/users/${response.message.user.name}/history/json`
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
}

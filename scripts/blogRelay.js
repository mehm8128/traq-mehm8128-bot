const fetch = require('node-fetch')
const CronJob = require('cron').CronJob

module.exports = (robot) => {
  const above = {
    '2/15': 'mehm8128',
    '2/16': 'mehm',
  }
  const below = {
    '2/15': 'mehm8128',
    '2/16': 'mehm',
  }
  const channelID = 'e93ef204-1e25-4456-90bf-9214a2e6684e'
  //ブログリレーID'22edf673-352f-4f18-88a1-201e681bc483'
  const today = new Date()
  const todayMonth = today.getMonth() + 1
  const todayDate = today.getDate()
  const todayString = `${todayMonth}/${todayDate}`
  const tommorowString = `${todayMonth}/${todayDate + 1}`
  const cron = new CronJob('10 12 * * *', () => {
    if (todayString in below && !(tommorowString in below)) {
      robot.send(
        { channelID: channelID },
        `@${above[todayString]} ,@${below[todayString]} 今日です\n@${above[tommorowString]} 明日です`
      )
    } else if (!(todayString in below) && tommorowString in below) {
      robot.send(
        { channelID: channelID },
        `@${above[todayString]} 今日です\n@${above[tommorowString]} ,@${below[tommorowString]} 明日です`
      )
    } else if (todayString in below && tommorowString in below) {
      robot.send(
        { channelID: channelID },
        `@${above[todayString]} ,@${above[todayString]} 今日です\n@${above[tommorowString]} ,@${above[tommorowString]} 明日です`
      )
    } else if (!(todayString in below) && !(tommorowString in below)) {
      robot.send(
        { channelID: channelID },
        `@${above[todayString]} 今日です\n@${above[tommorowString]} 明日です`
      )
    } else {
      robot.send({ channelID: channelID }, '@mehm8128 エラー発生')
    }
  })
}

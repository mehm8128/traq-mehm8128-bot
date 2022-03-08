const CronJob = require('cron').CronJob

module.exports = (robot) => {
  const list = {
    '3/9': '@mehm8128 @mehm8128 @d_etteiu8383',
    '3/10': '@irori @mehm8128',
    '3/11': '@yashu',
    '3/12': '@d_etteiu8383',
    '3/13': '@nabe',
    '3/14': '@Swan_417',
    '3/15': '@season1618',
    '3/16': '@uzaki',
    '3/17': '@toruthi',
    '3/18': '@mehm8128',
    '3/19': '@mehm8128',
    '3/20': '@d_etteiu8383',
    '3/21': '@d_etteiu8383',
    '3/22': '@xxarupakaxx',
    '3/23': '@kounosuke',
    '3/24': '@ebi',
    '3/25': '@Tennessine_699',
    '3/26': '@d_etteiu8383 @mehm8128',
    '3/27': '@irori',
    '3/28': '@anemone028199',
    '3/29': '@aya_se',
    '3/30': '@yuyu_5510',
    '3/31': '@liquid1224',
    '4/1': '@uzaki',
    '4/2': '@reyu',
    '4/3': '@kamijo',
    '4/4': '@Macky1_2',
    '4/5': '@dan_dan',
    '4/6': '@annin',
    '4/7': '@irori',
    '4/8': '@mera',
    '4/9': '',
    '4/10': '@kamecha',
    '4/11': '',
    '4/12': '',
    '4/13': '',
    '4/14': '',
    '4/15': '',
    '4/16': '',
    '4/17': '@kashiwade',
    '4/18': '',
    '4/19': '',
    '4/20': '',
    '4/21': '',
    '4/22': '',
    '4/23': '@Fourmsushi',
    '4/24': '',
    '4/25': '@komichi',
    '4/26': '',
    '4/27': '@mehm8128',
    '4/28': '',
    '4/29': '',
    '4/30': '@mehm8128',
  }
  const channelID = '22edf673-352f-4f18-88a1-201e681bc483'

  const cron = new CronJob(
    '00 10 * * *',
    () => {
      const today = new Date()
      const todayMonth = today.getMonth() + 1
      const todayDate = today.getDate()
      const todayString = `${todayMonth}/${todayDate}`
      const tommorowString = `${todayMonth}/${todayDate + 1}`
      if (todayString in list && !(tommorowString in list)) {
        robot.send(
          { channelID: channelID },
          `# ブログリレーリマインド\n${list[todayString]} 今日です\n## 注意！\n- 記事の初めに新歓ブログリレー2022の何日目の記事なのかを書いてください。\n- 記事の最後に次回の担当者の紹介をしてください。\n- 「新歓ブログリレー2022」のタグをつけてください。\n- post imageを設定してください。\n- 分からないことがあれば@mehm8128まで。`
        )
      } else if (!(todayString in list) && tommorowString in list) {
        robot.send(
          { channelID: channelID },
          `# ブログリレーリマインド\n今日の担当者はいません\n${list[tommorowString]} 明日です\n 準備をお願いします！`
        )
      } else if (todayString in list && tommorowString in list) {
        robot.send(
          { channelID: channelID },
          `# ブログリレーリマインド\n${list[todayString]} 今日です\n${list[tommorowString]} 明日です\n- 記事の初めに新歓ブログリレー2022の何日目の記事なのかを書いてください。\n- 記事の最後に明日の担当者の紹介をしてください。\n- 「新歓ブログリレー2022」のタグをつけてください。\n- post imageを設定してください。\n- 分からないことがあれば@mehm8128まで。`
        )
      } else if (!(todayString in list) && !(tommorowString in list)) {
        robot.send(
          { channelID: channelID },
          `# ブログリレーリマインド\n今日も明日も担当者がいません。`
        )
      } else {
        robot.send({ channelID: channelID }, '@mehm8128 エラー発生')
      }
    },
    null,
    true,
    'Asia/Tokyo'
  )
}
